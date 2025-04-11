import { Component, OnInit } from "@angular/core";
import { materialImports } from "../../material-imports";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from "@angular/material/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-tela-relatorio",
  imports: [...materialImports, NavbarComponent, CommonModule],
  templateUrl: "./tela-relatorio.component.html",

  providers: [
    provideNativeDateAdapter({
      parse: {
        dateInput: "DD/MM/YYYY",
      },
      display: {
        dateInput: "DD/MM/YYYY",
        monthYearLabel: "MM YYYY",
        dateA11yLabel: "DD/MM/YYYY",
        monthYearA11yLabel: "MM YYYY",
      },
    }),
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
  ],
  styleUrl: "./tela-relatorio.component.css",
})
export class TelaRelatorioComponent implements OnInit {
  filtroForm!: FormGroup;
  tipoFiltro: "data" | "categoria" = "data";
  selectedCategoria: string | null = null;
  categorias: string[] = ["Informática", "Eletrodoméstico", "Mecânico"];

  relatorio: { data: string; receita: number }[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      start: [null],
      end: [null],
    });

    // Mostrar todos os dados inicialmente
    this.relatorio = this.getTodosOsDados();

    this.filtroForm.valueChanges.subscribe(() => {
      if (this.tipoFiltro === "data") {
        this.atualizarRelatorioPorData();
      }
    });
  }

  getTodosOsDados() {
    return [
      { data: "2025-04-01", receita: 2000 },
      { data: "2025-04-02", receita: 1800 },
      { data: "2025-04-03", receita: 2300 },
      { data: "2025-04-04", receita: 1700 },
    ];
  }

  atualizarRelatorioPorData(): void {
    const { start, end } = this.filtroForm.value;
    if (start && end) {
      // Aqui você faria uma chamada ao backend filtrando por data, se necessário
      const todos = this.getTodosOsDados();
      this.relatorio = todos.filter((item) => {
        const itemDate = new Date(item.data);
        return itemDate >= start && itemDate <= end;
      });
    } else {
      this.relatorio = this.getTodosOsDados(); // Mostra tudo se datas não estão preenchidas
    }
  }

  atualizarRelatorioPorCategoria(): void {
    if (this.selectedCategoria) {
      // Simula busca por categoria
      this.relatorio = [{ data: this.selectedCategoria, receita: 7000 }];
    } else {
      // Todas as categorias
      this.relatorio = [
        { data: "Informática", receita: 5000 },
        { data: "Eletrodoméstico", receita: 7000 },
        { data: "Mecânico", receita: 2500 },
      ];
    }
  }

  onTipoFiltroChange(): void {
    this.relatorio = [];
    if (this.tipoFiltro === "categoria") {
      this.atualizarRelatorioPorCategoria();
    } else {
      this.atualizarRelatorioPorData();
    }
  }

  onCategoriaChange(): void {
    if (this.tipoFiltro === "categoria") {
      this.atualizarRelatorioPorCategoria();
    }
  }

  gerarRelatorio(): void {
    // função reservada para exportar PDF futuramente
  }
}
