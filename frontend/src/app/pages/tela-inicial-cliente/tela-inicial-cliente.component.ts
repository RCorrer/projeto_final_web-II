import { AuthService } from "./../../services/auth/auth.service";
import { Component, OnInit } from "@angular/core"; // Certifique-se que OnInit está importado
import { CommonModule } from "@angular/common";
import { SolicitacaoService } from "../../services/solicitacao/solicitacao.service";
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardSolicitacaoClienteComponent } from "../../components/cards/card-solicitacao-cliente/card-solicitacao-cliente.component";
import { Solicitacao } from "../../models/Solicitacao.model";
import { materialImports } from "../../material-imports";

@Component({
  selector: "app-tela-inicial-cliente",
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterLink,
    CardSolicitacaoClienteComponent,
    ...materialImports,
  ],
  templateUrl: "./tela-inicial-cliente.component.html",
  styleUrl: "./tela-inicial-cliente.component.css",
})
export class TelaInicialClienteComponent implements OnInit {
  solicitacoes: Solicitacao[] = [];
  nomeCliente: string | null = null;
  isLoading: boolean = false;

  constructor(
    private solicitacaoService: SolicitacaoService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.nomeCliente = this.authService.getUserName();

    const clienteId = this.authService.getIdRole();

    if (this.authService.isCliente() && clienteId) {
      this.carregarMinhasSolicitacoes(clienteId);
    } else {
      this.isLoading = false;
      this.solicitacoes = [];
    }

    // CORREÇÃO AQUI: Inscreva-se no Observable correto do serviço
    this.solicitacaoService.solicitacoesCliente$.subscribe((solicitacoesRecebidas) => {
      this.solicitacoes = [...solicitacoesRecebidas].sort(
        (a, b) =>
          new Date(`${a.data}T${a.hora}`).getTime() -
          new Date(`${b.data}T${b.hora}`).getTime()
      );
    });
  }

  carregarMinhasSolicitacoes(clienteId: string) {
    this.isLoading = true;
    this.solicitacoes = []; 
    this.solicitacaoService.fetchSolicitacoesPorClienteId(clienteId)
      .subscribe({
        error: (err: any) => {
          this.solicitacoes = []; 
          this.isLoading = false; 
        },
        complete: () => {
          this.isLoading = false; 
        }
      });
  }

  visualizarSolicitacao(id: string) {
  }

  mostrarOrcamento(id: string) {
  }

  resgatarServico(id: string) {
  }

  pagarServico(id: string) {
  }

  alterarEstadoSolicitacao(evento: { id: string; novoEstado: string }) {
    const index = this.solicitacoes.findIndex((s) => s.id === evento.id);
    if (index !== -1) {
      const solicitacoesAtualizadas = [...this.solicitacoes];
      solicitacoesAtualizadas[index] = {
        ...solicitacoesAtualizadas[index],
        estado: evento.novoEstado,
      };
      this.solicitacoes = solicitacoesAtualizadas;
    }
  }
}
