import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ModalMostarOrcamentoComponent } from '../modal-mostar-orcamento/modal-mostar-orcamento.component';
import { SolicitacaoService } from '../../services/solicitacao.service';

@Component({
  selector: 'app-card-solicitacao-cliente',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ModalMostarOrcamentoComponent, RouterModule],
  templateUrl: './card-solicitacao-cliente.component.html',
  styleUrl: './card-solicitacao-cliente.component.css'
})

export class CardSolicitacaoClienteComponent {
  @Input() solicitacao: any;

  @Output() visualizar = new EventEmitter<number>();
  @Output() mostrarOrcamento = new EventEmitter<number>();
  @Output() resgatarServico = new EventEmitter<number>();
  @Output() pagarServico = new EventEmitter<number>();
  @Output() alterarEstado = new EventEmitter<{ id: number, novoEstado: string }>();

  modalAberto = false;
  mostrarResgate = false;
  mostrarAprovacao = false;

  emitir(evento: string, id: number) {
    switch (evento) {
      case 'visualizar': this.visualizar.emit(id); break;
      case 'orcamento': this.mostrarOrcamento.emit(id); break;
      case 'resgatar': this.resgatarServico.emit(id); break;
      case 'pagar': this.pagarServico.emit(id); break;
    }
  }

  constructor(private solicitacaoService: SolicitacaoService) {}

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  modalResgatarServico() {
    this.mostrarResgate = true;
  }

  cancelarResgate() {
    this.mostrarResgate = false;
  }

  confirmarResgate() {
    this.mostrarResgate = false;
    this.mostrarAprovacao = true;
  }

  confirmarAprovacao() {
    this.alterarEstado.emit({
      id: this.solicitacao.id,
      novoEstado: 'APROVADA'
    });
    this.mostrarAprovacao = false;
  }

  onAlterarEstado(evento: { id: number, novoEstado: string }) {
    this.alterarEstado.emit(evento);
    this.fecharModal();
  }

  getEstadoDisplay(estado: string) {
    const map: {[key: string]: string} = {
      'ORCADA': 'ORÇADA'
    };

    return map[estado] || estado;
  }
}