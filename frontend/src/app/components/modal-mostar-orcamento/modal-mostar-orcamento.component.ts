import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-mostar-orcamento',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './modal-mostar-orcamento.component.html',
  styleUrl: './modal-mostar-orcamento.component.css'
})

export class ModalMostarOrcamentoComponent {
  @Input() isOpen = false;
  @Input() solicitacao: any;

  @Output() closed = new EventEmitter<void>();
  @Output() alterarEstado = new EventEmitter<{ id: number, novoEstado: string }>();

  close() {
    this.isOpen = false;
    this.closed.emit();
  }

  aceitarOrcamento() {
    this.alterarEstado.emit({
      id: this.solicitacao.id,
      novoEstado: 'APROVADA'
    });
    this.close();
  }

  recusarOrcamento() {
    this.alterarEstado.emit({
      id: this.solicitacao.id,
      novoEstado: 'REJEITADA'
    });
    this.close();
  }
}
