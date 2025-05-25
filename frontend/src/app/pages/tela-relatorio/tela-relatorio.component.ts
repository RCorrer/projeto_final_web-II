import { Component, OnInit } from "@angular/core";

// Declaração global para usar jsPDF que está carregado externamente (via script)
declare global {
  interface Window {
    jspdf: any; // jsPDF será acessado por window.jspdf
  }
}

import { FormBuilder, FormGroup } from "@angular/forms";
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from "@angular/material/core";

import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { materialImports } from "../../material-imports";
import { EquipamentoService } from "../../services/equipamento.service";

@Component({
  selector: "app-tela-relatorio",
  standalone: true,
  imports: [CommonModule, NavbarComponent, ...materialImports],
  templateUrl: "./tela-relatorio.component.html",
  styleUrl: "./tela-relatorio.component.css",
  providers: [
    // Define o formato de datas que será usado pelo DatePicker (pt-BR)
    provideNativeDateAdapter({
      parse: { dateInput: "DD/MM/YYYY" },
      display: {
        dateInput: "DD/MM/YYYY",
        monthYearLabel: "MM YYYY",
        dateA11yLabel: "DD de MMMM de YYYY",
        monthYearA11yLabel: "MMMM de YYYY",
      },
    }),
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
  ],
})
export class TelaRelatorioComponent implements OnInit {
  // Formulário reativo com filtros de data e categoria
  filtroForm!: FormGroup;

  // Lista de categorias (preenchida com base no serviço)
  categorias: string[] = [];

  // Total geral (usado no relatório por categoria)
  totalCategoria: number | null = null;

  // Tipo de relatório selecionado: por data ou por categoria
  tipoRelatorio: "porData" | "porCategoria" = "porData";

  dadosOriginais = [
    { data: "01/04/2025", receita: 2000, categoria: "Impressora" },
    { data: "01/04/2025", receita: 2000, categoria: "Impressora" },
    { data: "02/04/2025", receita: 1500, categoria: "Monitor" },
    { data: "02/04/2025", receita: 1500, categoria: "Monitor" },
    { data: "03/04/2025", receita: 1500, categoria: "Monitor" },
    { data: "03/04/2025", receita: 2300, categoria: "Teclado" },
  ];

  // Dados que serão renderizados no relatório (após filtragem)
  relatorio: any[] = [];

  constructor(
    private fb: FormBuilder,
    private equipamentoService: EquipamentoService
  ) {}

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      start: [null],
      end: [null],
      categoria: [null],
    });

    this.filtroForm.valueChanges.subscribe(() => this.atualizarRelatorio());
    this.carregarCategorias();
    this.atualizarRelatorio();
  }

  carregarCategorias(): void {
    // Simula uma busca de categorias no serviço de equipamentos
    this.categorias = this.equipamentoService
      .getEquipamentos()
      .map((c) => c.descricao);
  }

  formatarData(dataStr: string): string {
    // Converte "dd/mm/yyyy" para um formato de data legível (ex: "01 de abril de 2025")
    const [dia, mes, ano] = dataStr.split("/");
    const data = new Date(Number(ano), Number(mes) - 1, Number(dia));

    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  atualizarRelatorio(): void {
    // Atualiza os dados do relatório com base nos filtros selecionados

    const { start, end, categoria } = this.filtroForm.value;
    let dados = [...this.dadosOriginais]; // Clona os dados

    // Caso o relatório seja por categoria, agrupa e calcula total
    if (this.tipoRelatorio === "porCategoria") {
      const grupoMap: Record<string, number> = {};

      dados.forEach((item) => {
        grupoMap[item.categoria] =
          (grupoMap[item.categoria] || 0) + item.receita;
      });

      this.relatorio = Object.entries(grupoMap).map(([categoria, receita]) => ({
        categoria,
        receita,
      }));

      this.totalCategoria = dados.reduce((acc, item) => acc + item.receita, 0);
      return;
    }

    // 🔸 Caso o relatório seja por data, aplica filtros
    if (start && end) {
      dados = dados.filter((item) => {
        const [dia, mes, ano] = item.data.split("/");
        const itemDate = new Date(Number(ano), Number(mes) - 1, Number(dia));
        return itemDate >= start && itemDate <= end;
      });
    }

    if (categoria) {
      dados = dados.filter((item) => item.categoria === categoria);
    }

    // Agrupa os dados por data
    const grupoMap: Record<
      string,
      { data: string; itens: any[]; total: number }
    > = {};

    dados.forEach((item) => {
      const grupo = grupoMap[item.data] || {
        data: item.data,
        itens: [],
        total: 0,
      };
      grupo.itens.push(item);
      grupo.total += item.receita;
      grupoMap[item.data] = grupo;
    });

    this.relatorio = Object.values(grupoMap);
    this.totalCategoria = null;
  }

  // Função genérica para agrupar por uma chave (data ou categoria)
  agruparPor(dados: any[], chave: "data" | "categoria") {
    return Object.entries(
      dados.reduce((acc, item) => {
        acc[item[chave]] = (acc[item[chave]] || 0) + item.receita;
        return acc;
      }, {} as Record<string, number>)
    ).map(([key, receita]) => ({ [chave]: key, receita }));
  }

  // Agrupa os dados por data, incluindo o detalhe de cada categoria
  agruparPorDataComDetalhes(dados: any[]) {
    const agrupado: Record<string, { categoria: string; receita: number }[]> =
      {};

    dados.forEach((item) => {
      if (!agrupado[item.data]) {
        agrupado[item.data] = [];
      }
      agrupado[item.data].push({
        categoria: item.categoria,
        receita: item.receita,
      });
    });

    return Object.entries(agrupado).map(([data, registros]) => {
      const total = registros.reduce((soma, r) => soma + r.receita, 0);
      return { data, registros, total };
    });
  }

  gerarRelatorio(): void {
    // Acessa o construtor jsPDF via window (pois ele foi incluído externamente)
    const { jsPDF } = window.jspdf;

    // Cria uma nova instância do documento PDF
    const doc = new jsPDF();

    // Verifica se o tipo de relatório está definido
    if (!this.tipoRelatorio) {
      alert("Por favor, selecione um tipo de relatório antes de gerar o PDF.");
      return;
    }

    doc.text("Relatório de Receita", 10, 10);

    let y = 20;

    // Relatório por Categoria
    if (this.tipoRelatorio === "porCategoria") {
      this.relatorio.forEach((item) => {
        // Adiciona uma linha para cada categoria e valor
        doc.text(`${item.categoria}: R$ ${item.receita.toFixed(2)}`, 10, y);
        y += 10;
      });
      doc.text(
        `Total arrecadado: R$ ${this.totalCategoria?.toFixed(2)}`,
        10,
        y
      );

      // Relatório por Data com detalhes
    } else if (this.tipoRelatorio === "porData") {
      this.relatorio.forEach((grupo) => {
        // Adiciona a data
        doc.text(`${this.formatarData(grupo.data)}`, 10, y);
        y += 10;

        // Adiciona as receitas por categoria para essa data
        grupo.registros.forEach((item: any) => {
          doc.text(`- ${item.categoria}: R$ ${item.receita.toFixed(2)}`, 10, y);
          y += 10;
        });

        doc.text(`Total: R$ ${grupo.total.toFixed(2)}`, 10, y);
        y += 10;
      });
    } else {
      alert("Tipo de relatório inválido.");
      return;
    }

    doc.save("relatorio.pdf");
  }
}
