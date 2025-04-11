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
  @Output() closed = new EventEmitter<void>();

  close() {
    this.isOpen = false;
    this.closed.emit();
  }
}
