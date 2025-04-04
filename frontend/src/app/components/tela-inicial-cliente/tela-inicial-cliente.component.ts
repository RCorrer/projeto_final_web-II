import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-tela-inicial-cliente',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatListModule],
  templateUrl: './tela-inicial-cliente.component.html',
  styleUrl: './tela-inicial-cliente.component.css'
})
export class TelaInicialClienteComponent {

  solicitacoes = [
    { id: 1, dataHora: '2025-04-04 14:30', equipamento: 'Notebook Dell Inspiron', estado: 'ORÇADA' },
    { id: 2, dataHora: '2025-04-03 10:15', equipamento: 'Impressora HP LaserJet', estado: 'APROVADA' },
    { id: 3, dataHora: '2025-04-02 16:45', equipamento: 'Monitor LG 24”', estado: 'ARRUMADA' },
    { id: 4, dataHora: '2025-04-01 08:20', equipamento: 'Teclado Mecânico Redragon', estado: 'REJEITADA' }
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
