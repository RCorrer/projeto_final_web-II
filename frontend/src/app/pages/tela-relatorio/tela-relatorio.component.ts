import { CategoriaService } from './../../services/categoria/categoria.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { materialImports } from '../../material-imports';

@Component({
  selector: 'app-tela-relatorio',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ...materialImports],
  templateUrl: './tela-relatorio.component.html',
  styleUrl: './tela-relatorio.component.css',
  providers: [
    provideNativeDateAdapter({
      parse: { dateInput: 'DD/MM/YYYY' },
      display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MM YYYY',
        dateA11yLabel: 'DD de MMMM de YYYY',
        monthYearA11yLabel: 'MMMM de YYYY'
      },
    }),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
})
export class TelaRelatorioComponent implements OnInit {
  filtroForm!: FormGroup;
  categorias: string[] = [];
  totalCategoria: number | null = null;

  tipoRelatorio: 'porData' | 'porCategoria' = 'porData';
  dadosOriginais = [
    { data: '01/04/2025', receita: 2000, categoria: 'Impressora' },
    { data: '01/04/2025', receita: 2000, categoria: 'Impressora' },
    { data: '02/04/2025', receita: 1500, categoria: 'Monitor' },
    { data: '02/04/2025', receita: 1500, categoria: 'Monitor' },
    { data: '03/04/2025', receita: 1500, categoria: 'Monitor' },
    { data: '03/04/2025', receita: 2300, categoria: 'Teclado' },
  ];
  relatorio: any[] = [];

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.filtroForm = this.fb.group({ start: [null], end: [null], categoria: [null] });
    this.filtroForm.valueChanges.subscribe(() => this.atualizarRelatorio());
    this.carregarCategorias();
    this.atualizarRelatorio();

  }

  carregarCategorias(): void {
    // this.categorias = this.categoriaService.getCategorias().map(c => c.descricao);
  }

  formatarData(dataStr: string): string {
    const [dia, mes, ano] = dataStr.split('/');
    const data = new Date(Number(ano), Number(mes) - 1, Number(dia));
  
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
  

  atualizarRelatorio(): void {
    const { start, end, categoria } = this.filtroForm.value;
    let dados = [...this.dadosOriginais];
  
    // 🔸 RF020 - Relatório por Categoria (sem filtro de data)
    if (this.tipoRelatorio === 'porCategoria') {
      const grupoMap: Record<string, number> = {};
  
      dados.forEach(item => {
        grupoMap[item.categoria] = (grupoMap[item.categoria] || 0) + item.receita;
      });
  
      this.relatorio = Object.entries(grupoMap).map(([categoria, receita]) => ({
        categoria,
        receita,
      }));
  
      this.totalCategoria = dados.reduce((acc, item) => acc + item.receita, 0);
      return;
    }
  
    // 🔸 RF019 - Relatório por Data (com filtros)
    if (start && end) {
      dados = dados.filter(item => {
        const [dia, mes, ano] = item.data.split('/');
        const itemDate = new Date(Number(ano), Number(mes) - 1, Number(dia));
        return itemDate >= start && itemDate <= end;
      });
    }
  
    if (categoria) {
      dados = dados.filter(item => item.categoria === categoria);
    }
  
    const grupoMap: Record<string, { data: string, itens: any[], total: number }> = {};
  
    dados.forEach(item => {
      const grupo = grupoMap[item.data] || { data: item.data, itens: [], total: 0 };
      grupo.itens.push(item);
      grupo.total += item.receita;
      grupoMap[item.data] = grupo;
    });
  
    this.relatorio = Object.values(grupoMap);
    this.totalCategoria = null;
  }
  
  

  agruparPor(dados: any[], chave: 'data' | 'categoria') {
    return Object.entries(
      dados.reduce((acc, item) => {
        acc[item[chave]] = (acc[item[chave]] || 0) + item.receita;
        return acc;
      }, {} as Record<string, number>)
    ).map(([key, receita]) => ({ [chave]: key, receita }));
  }

  agruparPorDataComDetalhes(dados: any[]) {
    const agrupado: Record<string, { categoria: string; receita: number }[]> = {};
  
    dados.forEach(item => {
      if (!agrupado[item.data]) {
        agrupado[item.data] = [];
      }
      agrupado[item.data].push({ categoria: item.categoria, receita: item.receita });
    });
  
    return Object.entries(agrupado).map(([data, registros]) => {
      const total = registros.reduce((soma, r) => soma + r.receita, 0);
      return { data, registros, total };
    });
  }
  
  gerarRelatorio(): void {
    console.log('Dados agrupados:', this.relatorio);
  }
}