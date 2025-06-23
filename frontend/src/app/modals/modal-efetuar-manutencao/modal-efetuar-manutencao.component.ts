import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { materialImports } from '../../material-imports';

// Interface para os dados que o modal emitirá
export interface ManutencaoConfirmadaEvent {
  descricaoManutencao: string;
  orientacoesCliente: string;
}

@Component({
  selector: 'app-modal-efetuar-manutencao',
  standalone: true,
  imports: [CommonModule, FormsModule, ...materialImports],
  templateUrl: './modal-efetuar-manutencao.component.html',
  styleUrls: ['./modal-efetuar-manutencao.component.css']
})
export class ModalEfetuarManutencaoComponent implements OnChanges {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() confirmado = new EventEmitter<ManutencaoConfirmadaEvent>();

  descricaoManutencao: string = '';
  orientacoesCliente: string = '';

  constructor() {}

  // Limpa os campos quando o modal é aberto
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.descricaoManutencao = '';
      this.orientacoesCliente = '';
    }
  }

  confirmar(): void {
    if (this.descricaoManutencao && this.orientacoesCliente) {
      this.confirmado.emit({
        descricaoManutencao: this.descricaoManutencao,
        orientacoesCliente: this.orientacoesCliente
      });
    }
  }

  fechar(): void {
    this.closed.emit();
  }
}