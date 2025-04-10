import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CardSolicitacaoClienteComponent } from '../card-solicitacao-cliente/card-solicitacao-cliente.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-tela-inicial-cliente',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatListModule, CardSolicitacaoClienteComponent, NavbarComponent],
  templateUrl: './tela-inicial-cliente.component.html',
  styleUrl: './tela-inicial-cliente.component.css'
})
export class TelaInicialClienteComponent {

  solicitacoes = [
    { id: 1, dataHora: '2025-04-01 14:30', equipamento: 'Notebook Dell', estado: 'ABERTA' },
    { id: 2, dataHora: '2025-04-02 15:15', equipamento: 'Impressora Xerox', estado: 'ORÇADA' },
    { id: 3, dataHora: '2025-04-03 16:45', equipamento: 'Mouse de bolinha', estado: 'REJEITADA' },
    { id: 4, dataHora: '2025-04-04 17:20', equipamento: 'Teclado com farelo de pão', estado: 'APROVADA' },
    { id: 5, dataHora: '2025-04-05 08:30', equipamento: 'Notebook Positivo feito pra defeito', estado: 'REDIRECIONADA' },
    { id: 6, dataHora: '2025-04-06 09:15', equipamento: 'Impressora HP (HarryPotter)', estado: 'ARRUMADA' },
    { id: 7, dataHora: '2025-04-07 10:45', equipamento: 'Monitor Tubo', estado: 'PAGA' },
    { id: 8, dataHora: '2025-04-08 11:20', equipamento: 'Monitor LG 24"', estado: 'FINALIZADA' }
  ];

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
}
