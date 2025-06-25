import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { materialImports } from "../../material-imports";
import {
  RelatorioPorCategoria,
  RelatorioPorDia,
} from "../../models/relatorio.model";
import { RelatorioService } from "../../services/relatorio/relatorio.service";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from "@angular/material/core";

@Component({
  selector: "app-tela-relatorio",
  standalone: true,
  imports: [CommonModule, NavbarComponent, ...materialImports],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
  ],
  templateUrl: "./tela-relatorio.component.html",
  styleUrl: "./tela-relatorio.component.css",
})
export class TelaRelatorioComponent implements OnInit {
  tipoRelatorio: "porData" | "porCategoria" = "porData";
  filtroForm!: FormGroup;

  relatorioPorCategoria: RelatorioPorCategoria[] = [];
  totalCategoria = 0;
  displayedColumnsCategoria: string[] = [
    "categoria",
    "quantidadeServicos",
    "receitaTotal",
  ];

  relatorioDia: RelatorioPorDia[] = [];
  totalPeriodo = 0;
  displayedColumnsData: string[] = ["dia", "receitaTotal"];

  constructor(
    private fb: FormBuilder,
    private relatorioService: RelatorioService
  ) {}

  ngOnInit(): void {
    const hoje = new Date();
    const umMesAtras = new Date();
    umMesAtras.setMonth(hoje.getMonth() - 1);

    this.filtroForm = this.fb.group({
      start: [umMesAtras],
      end: [hoje],
    });

    this.ouvirFiltro();
    this.atualizarRelatorio();
  }

  ouvirFiltro(): void {
    this.filtroForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        if (this.tipoRelatorio === "porData") {
          this.carregarRelatorioPorDia();
        }
      });
  }

  atualizarRelatorio(): void {
    if (this.tipoRelatorio === "porCategoria") {
      this.filtroForm.disable({ emitEvent: false });
      this.carregarRelatorioPorCategoria();
    } else {
      this.filtroForm.enable({ emitEvent: false });
      this.carregarRelatorioPorDia();
    }
  }

  carregarRelatorioPorDia(): void {
    const { start, end } = this.filtroForm.value;
    const dataInicial = start
      ? new Date(start).toISOString().split("T")[0]
      : undefined;
    const dataFinal = end
      ? new Date(end).toISOString().split("T")[0]
      : undefined;

    this.relatorioService
      .getRelatorioPorPeriodo(dataInicial, dataFinal)
      .subscribe({
        next: (data) => {
          this.relatorioDia = data;
          this.totalPeriodo = data.reduce(
            (acc, item) => acc + item.receitaTotal,
            0
          );
        },
        error: (err) =>
          console.error("Erro ao carregar relatório por dia:", err),
      });
  }

  carregarRelatorioPorCategoria(): void {
    this.relatorioService.getRelatorioPorCategoria().subscribe({
      next: (data) => {
        this.relatorioPorCategoria = data;
        this.totalCategoria = data.reduce(
          (acc, item) => acc + item.receitaTotal,
          0
        );
      },
      error: (err) =>
        console.error("Erro ao carregar relatório por categoria:", err),
    });
  }

  formatarData(dataStr: string): string {
    const data = new Date(dataStr + "T00:00:00-03:00");
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  gerarPDF(): void {
    const doc = new jsPDF();
    const formatCurrency = (value: number) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);

    if (this.tipoRelatorio === "porData") {
      doc.text("Relatório de Receita por Período", 14, 20);
      autoTable(doc, {
        startY: 30,
        headStyles: {
          fillColor: "#8080ff",
          textColor: "#ffffff",
          fontStyle: "bold",
        },
        head: [
          [
            { content: "Data", styles: { halign: "left" } },
            { content: "Receita Total do Dia", styles: { halign: "right" } },
          ],
        ],
        body: this.relatorioDia.map((item) => [
          this.formatarData(item.dia),
          formatCurrency(item.receitaTotal),
        ]),
        foot: [
          [
            {
              content: "Total do Período",
              styles: { halign: "left", fontStyle: "bold" as const },
            },
            {
              content: formatCurrency(this.totalPeriodo),
              styles: { halign: "right", fontStyle: "bold" as const },
            },
          ],
        ],
        footStyles: {
          fillColor: "#8080ff",
          textColor: "#ffffff",
          fontStyle: "bold",
        },
        columnStyles: { 1: { halign: "right" } },
        showFoot: "lastPage",
      });
    } else {
      doc.text("Relatório de Receita por Categoria", 14, 20);
      autoTable(doc, {
        startY: 30,
        headStyles: {
          fillColor: "#8080ff",
          textColor: "#ffffff",
          fontStyle: "bold",
        },
        head: [
          [
            { content: "Categoria", styles: { halign: "left" } },
            { content: "Quantidade de Serviços", styles: { halign: "center" } },
            { content: "Receita Total", styles: { halign: "right" } },
          ],
        ],
        body: this.relatorioPorCategoria.map((item) => [
          item.categoria,
          item.quantidadeServicos.toString(),
          formatCurrency(item.receitaTotal),
        ]),
        foot: [
          [
            {
              content: "Total",
              colSpan: 2,
              styles: { halign: "left" },
            },
            {
              content: formatCurrency(this.totalCategoria),
              styles: { halign: "right" },
            },
          ],
        ],
        footStyles: {
          fillColor: "#8080ff",
          textColor: "#ffffff",
          fontStyle: "bold",
        },
        columnStyles: { 1: { halign: "center" }, 2: { halign: "right" } },
        showFoot: "lastPage",
      });
    }

    doc.save(`relatorio_${this.tipoRelatorio}.pdf`);
  }
}
