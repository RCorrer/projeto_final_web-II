import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card-solicitacao-cliente',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './card-solicitacao-cliente.component.html',
  styleUrl: './card-solicitacao-cliente.component.css'
})
export class CardSolicitacaoClienteComponent {
  @Input() solicitacao: any;
  
  @Output() visualizar = new EventEmitter<number>();
  @Output() mostrarOrcamento = new EventEmitter<number>();
  @Output() resgatarServico = new EventEmitter<number>();
  @Output() pagarServico = new EventEmitter<number>();

  emitir(evento: string, id: number) {
    switch (evento) {
      case 'visualizar': this.visualizar.emit(id); break;
      case 'orcamento': this.mostrarOrcamento.emit(id); break;
      case 'resgatar': this.resgatarServico.emit(id); break;
      case 'pagar': this.pagarServico.emit(id); break;
    }
  }
}