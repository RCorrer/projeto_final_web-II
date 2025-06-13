import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ModalMostarOrcamentoComponent } from '../../../modals/modal-mostar-orcamento/modal-mostar-orcamento.component';
import { SolicitacaoService } from '../../../services/solicitacao/solicitacao.service';
import { DataFormatadaPipe } from '../../../shared/data-formatada.pipe';
import { HoraFormatadaPipe } from "../../../shared/hora-formatada.pipe";

@Component({
  selector: 'app-card-solicitacao-cliente',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ModalMostarOrcamentoComponent, RouterModule, DataFormatadaPipe, HoraFormatadaPipe],
  templateUrl: './card-solicitacao-cliente.component.html',
  styleUrl: './card-solicitacao-cliente.component.css'
})

export class CardSolicitacaoClienteComponent {
  @Input() solicitacao: any;

  @Output() visualizar = new EventEmitter<string>();
  @Output() mostrarOrcamento = new EventEmitter<string>();
  @Output() resgatarServico = new EventEmitter<string>();
  @Output() pagarServico = new EventEmitter<string>();
  @Output() alterarEstado = new EventEmitter<{ id: string, novoEstado: string }>();

  modalAberto = false;
  mostrarResgate = false;
  mostrarAprovacao = false;

  emitir(evento: string, id: string) {
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

  onAlterarEstado(evento: { id: string, novoEstado: string }) {
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