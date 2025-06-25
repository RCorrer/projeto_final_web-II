import { SolicitacaoService } from "./../../services/solicitacao/solicitacao.service";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SolicitacaoComHistoricoDTO } from "../../models/solicitacao-dto.model";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: "app-modal-mostar-orcamento",
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: "./modal-mostar-orcamento.component.html",
  styleUrl: "./modal-mostar-orcamento.component.css",
})
export class ModalMostarOrcamentoComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() solicitacao: any;

  @Output() closed = new EventEmitter<void>();
  @Output() alterarEstado = new EventEmitter<{
    id: string;
    novoEstado: string;
  }>();

  mostrarRejeicao = false;
  mostrarAprovacao = false;

  motivoRejeicao: string = "";

  informacoesSolicitacao: SolicitacaoComHistoricoDTO | null = null;

  constructor(private solicitacaoService: SolicitacaoService) {}

  mostrarDetalhesSolicitacao(id: string): void {
    this.informacoesSolicitacao = null;

    this.solicitacaoService.fetchDetalhesSolicitacao(id).subscribe({
      next: (dados) => {
        this.informacoesSolicitacao = dados;
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpen && this.solicitacao && this.solicitacao.id) {
      this.mostrarDetalhesSolicitacao(this.solicitacao.id);
    }
  }

  close() {
    this.isOpen = false;
    this.closed.emit();
  }

  aceitarOrcamento() {
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

    this.close();
  }

  mostarModalRejeitar() {
    this.mostrarRejeicao = true;
  }

  cancelarRejeicao() {
    this.mostrarRejeicao = false;
  }

  confirmarRejeicao() {
    if (!this.motivoRejeicao || this.motivoRejeicao.trim() === "") {
      return;
    }

    const body = {
      id: this.solicitacao.id,
      motivo: this.motivoRejeicao,
    };

    this.solicitacaoService.rejeitarSolicitacao(body).subscribe({
      next: () => {
        this.alterarEstado.emit({
          id: this.solicitacao.id,
          novoEstado: "4",
        });
        this.mostrarRejeicao = false;
        this.close();
      },
    });
  }
}
