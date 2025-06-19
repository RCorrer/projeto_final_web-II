import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { materialImports } from "../../material-imports";
import { RelatorioPorCategoria } from "../../models/relatorio/relatorio.model";
import { RelatorioService } from "../../services/relatorio/relatorio.service";
import { MatTableModule } from "@angular/material/table";

// Importações para o PDF
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
  selector: "app-tela-relatorio",
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule,
    MatTableModule,
    ...materialImports,
  ],
  templateUrl: "./tela-relatorio.component.html",
  styleUrl: "./tela-relatorio.component.css",
})
export class TelaRelatorioComponent implements OnInit {
  // Define quais colunas e em que ordem a tabela deve exibi-las
  displayedColumns: string[] = [
    "categoria",
    "quantidadeServicos",
    "receitaTotal",
  ];

  // Propriedades para armazenar os dados do relatório
  totalCategoria = 0;
  relatorioPorCategoria: RelatorioPorCategoria[] = [];

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.carregarRelatorioPorCategoria();
  }

  carregarRelatorioPorCategoria(): void {
    this.relatorioService.getRelatorioPorCategoria().subscribe({
      next: (data) => {
        console.log("Dados de Categoria Recebidos:", data);
        // Atribui os dados recebidos à propriedade do componente
        this.relatorioPorCategoria = data;
        // Calcula o total
        this.totalCategoria = data.reduce(
          (acc, item) => acc + item.receitaTotal,
          0
        );
      },
      error: (err) => {
        console.error("Erro ao carregar relatório por categoria:", err);
      },
    });
  }

  gerarPDF(): void {
    const doc = new jsPDF();

    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    };

    doc.setFontSize(24);
    doc.text("Relatório de Receita por Categoria", 14, 20);

    autoTable(doc, {
      startY: 30,

      headStyles: {
        fillColor: "#2f48e0",
        fontStyle: "bold",
        textColor: "#ffffff",
      },
      head: [["Categoria", "Qtd. Serviços", "Receita Total"]],
      // Usa os dados da propriedade 'relatorioPorCategoria' para criar o corpo
      body: this.relatorioPorCategoria.map((item) => [
        item.categoria,
        item.quantidadeServicos.toString(),
        formatCurrency(item.receitaTotal),
      ]),
      footStyles: {
        fillColor: "#2f48e0",
        fontStyle: "bold",
        textColor: "#ffffff",
      },
      // Usa o 'totalCategoria' para o rodapé
      foot: [
        [
          {
            content: "Total Geral",
            colSpan: 2,
            styles: { fontStyle: "bold" as const },
          },
          {
            content: formatCurrency(this.totalCategoria),
            styles: {
              halign: "right",
              fontStyle: "bold" as const,
            },
          },
        ],
      ],
      columnStyles: { 2: { halign: "right" } },
      showFoot: "lastPage",
    });

    doc.save(`relatorio_por_categoria.pdf`);
  }
}
