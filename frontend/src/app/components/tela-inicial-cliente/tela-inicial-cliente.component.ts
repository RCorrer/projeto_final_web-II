import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CardSolicitacaoClienteComponent } from '../card-solicitacao-cliente/card-solicitacao-cliente.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SolicitacaoService } from '../../services/solicitacao.service';

@Component({
  selector: 'app-tela-inicial-cliente',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatListModule, CardSolicitacaoClienteComponent, NavbarComponent],
  templateUrl: './tela-inicial-cliente.component.html',
  styleUrl: './tela-inicial-cliente.component.css'
})
export class TelaInicialClienteComponent {
  solicitacoes: any[] = [];

  constructor(private solicitacaoService: SolicitacaoService) {}

  ngOnInit() {
    this.solicitacaoService.solicitacoes$.subscribe(solicitacoes => {
      this.solicitacoes = solicitacoes
        .filter(s => s.cliente === 'Maria Joaquina')
        .sort((a, b) => new Date (b.dataHora).getTime() - new Date (a.dataHora).getTime());
    });
  }

  visualizarSolicitacao(id: number) {
    console.log(`Visualizando solicitação ID: ${id}`);
  }

  mostrarOrcamento(id: number) {
    console.log(`Mostrando orçamento para solicitação ID: ${id}`);
  }

  resgatarServico(id: number) {
    console.log(`Resgatando serviço para solicitação ID: ${id}`);
  }

  pagarServico(id: number) {
    console.log(`Pagando serviço para solicitação ID: ${id}`);
  }

  alterarEstadoSolicitacao(evento: {id: number, novoEstado: string}) {
    const solicitacao = this.solicitacoes.find(s => s.id === evento.id);
    if (solicitacao) {
      solicitacao.estado = evento.novoEstado;
    }
  }
}
