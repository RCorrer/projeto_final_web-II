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
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"; // Para o spinner

@Component({
  selector: "app-dashboard-funcionario",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...materialImports, 
    CardSolicitacaoComponent,
    NavbarComponent,
    MatNativeDateModule,
  ],
  providers: [
    provideNativeDateAdapter({
      parse: { dateInput: "DD/MM/YYYY" },
      display: {
        dateInput: "DD/MM/YYYY",
        monthYearLabel: "MMMM yyyy",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM yyyy",
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
      if (params["estado"] !== undefined) {
        this.filtroStatus = params["estado"] === '' ? '' : params["estado"]; 
      } else {
        this.filtroStatus = '1';
      }
      this.carregarSolicitacoesIniciais();
    });

    this.filtroForm.valueChanges.subscribe(() => {
      this.aplicarFiltrosEOrdenar();
    });

    // Inscreve-se no Observable do serviço para receber a lista de solicitações do funcionário
    this.solicitacaoService.solicitacoesFuncionario$.subscribe(listaDoServico => {
      this.todasSolicitacoesBase = listaDoServico;
      this.aplicarFiltrosEOrdenar();
    });
  }

  carregarSolicitacoesIniciais(): void {
    if (this.authService.isFuncionario() && this.funcionarioLogadoId) {
      this.isLoading = true;
      this.todasSolicitacoesBase = [];
      this.aplicarFiltrosEOrdenar();

      this.solicitacaoService.fetchSolicitacoesDashboard(this.funcionarioLogadoId)
        .subscribe({
          next: () => {
            console.log('DashboardFuncionario: Chamada para fetchSolicitacoesDashboard completada.');
          },
          error: (err) => {
            console.error('DashboardFuncionario: Erro ao buscar solicitações para funcionário:', err);
            this.isLoading = false;
            this.todasSolicitacoesBase = [];
            this.aplicarFiltrosEOrdenar();
          },
          complete: () => {
          }
        });
    } else {
      console.warn("DashboardFuncionario: Usuário não é funcionário ou ID do funcionário não encontrado.");
      this.isLoading = false;
      this.todasSolicitacoesBase = [];
      this.aplicarFiltrosEOrdenar();
    }
  }
  
  onFiltroStatusChange(): void {
    this.aplicarFiltrosEOrdenar();
  }

  aplicarFiltrosEOrdenar(): void {
    this.isLoading = true;
    let resultadoFiltrado = [...this.todasSolicitacoesBase];

    if (this.filtroStatus && this.filtroStatus !== '') {
      resultadoFiltrado = resultadoFiltrado.filter(s => s.estado === this.filtroStatus);
    }

    const { tipoFiltroData, start, end } = this.filtroForm.value;

    if (tipoFiltroData === 'HOJE') {
      const hoje = new Date(); 
      hoje.setHours(0, 0, 0, 0);
      resultadoFiltrado = resultadoFiltrado.filter(s => {
        if (!s.data) return false; // Se não houver data, não incluir
        // Adiciona T00:00:00 para garantir que a comparação de datas não seja afetada por fuso ou hora
        const dataSolicitacao = new Date(s.data + 'T00:00:00'); 
        return dataSolicitacao.getTime() === hoje.getTime();
      });
    } else if (tipoFiltroData === 'PERIODO' && start && end) {
      const dataInicio = new Date(start);
      dataInicio.setHours(0,0,0,0); // Normaliza para o início do dia
      const dataFim = new Date(end);
      dataFim.setHours(23,59,59,999); // Normaliza para o fim do dia

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
    
    console.log('DashboardFuncionario: Solicitações para exibição:', this.solicitacoesParaExibicao);
    this.isLoading = false;
  }

  get solicitacoesFiltradas(): Solicitacao[] {
    return this.solicitacoesParaExibicao;
  }
}