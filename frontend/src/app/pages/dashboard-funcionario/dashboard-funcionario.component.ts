import { Component, OnInit } from "@angular/core";
import { materialImports } from "../../material-imports";
import { CardSolicitacaoComponent } from "../../components/cards/card-solicitacao/card-solicitacao.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Solicitacao } from "../../models/Solicitacao.model";
import { CommonModule } from "@angular/common";
import { SolicitacaoService } from "../../services/solicitacao/solicitacao.service";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-dashboard-funcionario",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...materialImports,
    CardSolicitacaoComponent,
    NavbarComponent,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  providers: [
    provideNativeDateAdapter({
      parse: { dateInput: "DD/MM/YYYY" },
      display: {
        dateInput: "DD/MM/YYYY",
        monthYearLabel: "MMMM<x_bin_715>",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM<x_bin_715>",
      },
    }),
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
  ],
  templateUrl: "./dashboard-funcionario.component.html",
  styleUrl: "./dashboard-funcionario.component.css"
})
export class DashboardFuncionarioComponent implements OnInit {
  todasSolicitacoesBase: Solicitacao[] = [];
  solicitacoesParaExibicao: Solicitacao[] = [];

  filtroStatus: string = '1';
  filtroForm!: FormGroup;
  isLoading: boolean = false;
  funcionarioLogadoId: string | null = null;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      tipoFiltroData: ['TODAS'],
      start: [null],
      end: [null],
    });

    this.funcionarioLogadoId = this.authService.getIdRole();

    this.route.queryParams.subscribe(params => {
      this.filtroStatus = params["estado"] ?? '1';
      this.carregarDadosDoBackend(); // Chama o método de busca principal
    });

    this.filtroForm.valueChanges.subscribe(() => {
      this.aplicarFiltrosEOrdenar();
    });

    // A subscrição permanente ao Observable do serviço foi REMOVIDA daqui.
  }

  carregarDadosDoBackend(): void {
    if (!this.authService.isFuncionario() || !this.funcionarioLogadoId) {
      console.warn("Usuário não é funcionário ou ID não encontrado.");
      return;
    }

    this.isLoading = true;
    this.solicitacaoService.fetchSolicitacoesDashboard(this.funcionarioLogadoId)
      .subscribe({
        next: (listaDoServico) => {
          // AQUI ESTÁ A LÓGICA CENTRALIZADA:
          // 1. Substitui a lista base com os novos dados do backend.
          this.todasSolicitacoesBase = listaDoServico;
          // 2. Aplica os filtros sobre esta nova lista.
          this.aplicarFiltrosEOrdenar();
          console.log('DashboardFuncionario: Dados carregados e filtros aplicados.');
        },
        error: (err) => {
          console.error('DashboardFuncionario: Erro ao buscar solicitações:', err);
          this.todasSolicitacoesBase = [];
          this.aplicarFiltrosEOrdenar(); // Limpa a exibição em caso de erro
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
  
  onFiltroStatusChange(): void {
    this.aplicarFiltrosEOrdenar();
  }

  aplicarFiltrosEOrdenar(): void {
    let resultadoFiltrado = [...this.todasSolicitacoesBase];

    if (this.filtroStatus && this.filtroStatus !== '') {
      resultadoFiltrado = resultadoFiltrado.filter(s => s.estado === this.filtroStatus);
    }

    const { tipoFiltroData, start, end } = this.filtroForm.value;

    if (tipoFiltroData === 'HOJE') {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      resultadoFiltrado = resultadoFiltrado.filter(s => {
        if (!s.data) return false;
        const dataSolicitacao = new Date(s.data + 'T00:00:00');
        return dataSolicitacao.getTime() === hoje.getTime();
      });
    } else if (tipoFiltroData === 'PERIODO' && start && end) {
      const dataInicio = new Date(start);
      dataInicio.setHours(0,0,0,0);
      const dataFim = new Date(end);
      dataFim.setHours(23,59,59,999);
      resultadoFiltrado = resultadoFiltrado.filter(s => {
        if (!s.data) return false;
        const dataSolicitacao = new Date(s.data + 'T00:00:00');
        return dataSolicitacao >= dataInicio && dataSolicitacao <= dataFim;
      });
    }
    
    this.solicitacoesParaExibicao = resultadoFiltrado.sort((a, b) => {
        const dataHoraA = new Date(`${a.data}T${a.hora}`);
        const dataHoraB = new Date(`${b.data}T${b.hora}`);
        return dataHoraA.getTime() - dataHoraB.getTime();
    });
  }

  get solicitacoesFiltradas(): Solicitacao[] {
    return this.solicitacoesParaExibicao;
  }

  handleFinalizarSolicitacao(solicitacaoId: string): void {
    if (!solicitacaoId) return;

    this.solicitacaoService.finalizarSolicitacao(solicitacaoId).subscribe({
      next: (response) => {
        console.log(`Resposta ao finalizar OS ${solicitacaoId}:`, response);
        this.carregarDadosDoBackend(); // Recarrega os dados para refletir a mudança
      },
      error: (err) => {
        console.error(`Erro ao finalizar a OS ${solicitacaoId}:`, err);
      }
    });
  }
}