import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from "@angular/core"; // Certifique-se que OnInit está importado
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { SolicitacaoService } from "../../services/solicitacao/solicitacao.service";
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardSolicitacaoClienteComponent } from "../../components/cards/card-solicitacao-cliente/card-solicitacao-cliente.component";
import { Solicitacao } from "../../models/Solicitacao.model";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: "app-tela-inicial-cliente",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    NavbarComponent,
    RouterLink,
    CardSolicitacaoClienteComponent,
    MatProgressSpinnerModule
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
      console.log(`tela-inicial-cliente: usuario é cliente. Buscando solicitações para Clientes.id: ${clienteId}`);
      this.carregarMinhasSolicitacoes(clienteId);
    } else {
      console.warn("tela-inicial-cliente: usuário não é cliente ou idRole (Clientes.id) não encontrado.");
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
      console.log('tela-inicial-cliente: lista de solicitações (do backend) atualizada no componente:', this.solicitacoes);
    });
  }

  carregarMinhasSolicitacoes(clienteId: string) {
    this.isLoading = true;
    this.solicitacoes = []; 
    this.solicitacaoService.fetchSolicitacoesPorClienteId(clienteId)
      .subscribe({
        next: () => { 
          console.log('tela-inicial-cliente: chamada fetchSolicitacoesPorClienteId completada.');
        },
        error: (err: any) => {
          console.error('tela-inicial-cliente: erro ao chamar fetchSolicitacoesPorClienteId:', err);
          this.solicitacoes = []; 
          this.isLoading = false; 
        },
        complete: () => {
          this.isLoading = false; 
          console.log('tela-inicial-cliente: carregamento de solicitações finalizado.');
        }
      });
  }

  visualizarSolicitacao(id: string) {
    console.log(`Visualizando solicitação ID: ${id}`);
  }

  mostrarOrcamento(id: string) {
    console.log(`Mostrando orçamento para solicitação ID: ${id}`);
  }

  resgatarServico(id: string) {
    console.log(`Resgatando serviço para solicitação ID: ${id}`);
  }

  pagarServico(id: string) {
    console.log(`Pagando serviço para solicitação ID: ${id}`);
  }

  alterarEstadoSolicitacao(evento: { id: string; novoEstado: string }) {
    console.log(`Mock: Alterando estado da OS ${evento.id} para ${evento.novoEstado}`);
    // TODO: Chamar o método apropriado no SolicitacaoService para atualizar o estado no backend
    // Ex: this.solicitacaoService.atualizarAlgumEstado(evento.id, evento.novoEstadoOuDTO).subscribe(...);

    // Atualização local para UI (idealmente o BehaviorSubject do serviço faria isso após sucesso do backend)
    const index = this.solicitacoes.findIndex((s) => s.id === evento.id);
    if (index !== -1) {
      const solicitacoesAtualizadas = [...this.solicitacoes];
      solicitacoesAtualizadas[index] = { ...solicitacoesAtualizadas[index], estado: evento.novoEstado };
      this.solicitacoes = solicitacoesAtualizadas;
    }
  }
}