import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { ModalMostarOrcamentoComponent } from "../../../modals/modal-mostar-orcamento/modal-mostar-orcamento.component";
import { SolicitacaoService } from "../../../services/solicitacao/solicitacao.service";
import { DataFormatadaPipe } from "../../../shared/data-formatada.pipe";
import { HoraFormatadaPipe } from "../../../shared/hora-formatada.pipe";
import { Solicitacao } from "../../../models/Solicitacao.model";

@Component({
  selector: "app-card-solicitacao-cliente",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ModalMostarOrcamentoComponent,
    RouterModule,
    DataFormatadaPipe,
    HoraFormatadaPipe,
  ],
  templateUrl: "./card-solicitacao-cliente.component.html",
  styleUrl: "./card-solicitacao-cliente.component.css",
})
export class CardSolicitacaoClienteComponent {
  @Input() solicitacao!: Solicitacao;

  @Output() visualizar = new EventEmitter<string>();
  @Output() mostrarOrcamento = new EventEmitter<string>();
  @Output() resgatarServico = new EventEmitter<string>();
  @Output() pagarServico = new EventEmitter<string>();
  @Output() alterarEstado = new EventEmitter<{
    id: string;
    novoEstado: string;
  }>();

  modalAberto = false;
  mostrarResgate = false;
  mostrarAprovacao = false;

  constructor(private solicitacaoService: SolicitacaoService) {}

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  modalResgatarServico() {
    const confirmacao = confirm("Deseja realmente resgatar esta solicitação?");
    if (confirmacao) {
      this.confirmarResgate();
    }
  }

  cancelarResgate() {
    this.mostrarResgate = false;
  }

  confirmarResgate() {
    const body = {
      id: this.solicitacao.id,
      motivo: ".",
    };

    this.solicitacaoService.aprovarSolicitacao(body).subscribe({
      next: () => {
        this.alterarEstado.emit({
          id: this.solicitacao.id,
          novoEstado: "3",
        });
        this.mostrarAprovacao = true;
      },
    });
  }

  confirmarAprovacao() {
    this.mostrarAprovacao = false;
  }

  onAlterarEstado(evento: { id: string; novoEstado: string }) {
    this.alterarEstado.emit(evento);
    this.fecharModal();
    if (evento.novoEstado === "3") {
      this.mostrarAprovacao = true;
    }
  }

  getEstadoDisplay(estadoId: string): string {
    const mapaDeEstados: { [key: string]: string } = {
      "1": "ABERTA",
      "2": "ORÇADA",
      "3": "APROVADA",
      "4": "REJEITADA",
      "5": "REDIRECIONADA",
      "6": "ARRUMADA",
      "7": "PAGA",
      "8": "FINALIZADA",
      "9": "ENTREGADA",
    };
    return mapaDeEstados[estadoId] || estadoId;
  }

  getCssClasseEstado(estadoId: string): string {
    const display = this.getEstadoDisplay(estadoId).toLowerCase();
    return this.removerAcentos(display);
  }

  removerAcentos(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
