import { Component, Input, OnInit } from '@angular/core';
import { materialImports } from '../../../material-imports';
import { CommonModule } from '@angular/common';
import { Solicitacao } from '../../../models/Solicitacao.model';
import { DataFormatadaPipe } from '../../../shared/data-formatada.pipe';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { RouterLink, RouterModule } from '@angular/router';
import { HoraFormatadaPipe } from "../../../shared/hora-formatada.pipe";

@Component({
  selector: 'app-card-solicitacao',
  imports: [...materialImports, CommonModule, DataFormatadaPipe, RouterLink, RouterModule, HoraFormatadaPipe],
  templateUrl: './card-solicitacao.component.html',
  styleUrl: './card-solicitacao.component.css'
})

export class CardSolicitacaoComponent {
  @Input() solicitacao!: Solicitacao;

  backgroundColor: string = 'var(--color-aberto)';

  ngOnInit(): void {
    this.solicitacaoService.solicitacoes$.subscribe(solicitacoes => {
      const solicitacaoAtualizada = solicitacoes.find(s => s.id === this.solicitacao?.id);
      if (solicitacaoAtualizada) {
        this.solicitacao = solicitacaoAtualizada;
      }
    });

    this.backgroundColor = this.getColor (this.solicitacao.estado);
  }

  constructor(private solicitacaoService: SolicitacaoService) {}

  getColor(estado: string): string {
    switch (estado) {
      case 'ABERTA':
        return 'var(--color-aberto)';
      case 'ORCADA':
        return 'var(--color-orcada)';
      case 'REJEITADA':
        return 'var(--color-rejeitada)';
      case 'APROVADA':
        return 'var(--color-aprovada)';
      case 'REDIRECIONADA':
        return 'var(--color-redirecionada)';
      case 'ARRUMADA':
        return 'var(--color-arrumada)';
      case 'PAGA':
        return 'var(--color-paga)';
      case 'FINALIZADA':
        return 'var(--color-finalizada)';
      default:
        return 'gray';
    }
  }

  realizarAcao(novoEstado: string) {
    if (this.solicitacao) {
      const estadoPadronizado = novoEstado.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      this.solicitacaoService.atualizarSolicitacao(this.solicitacao.id, novoEstado);
    }
  }

}
