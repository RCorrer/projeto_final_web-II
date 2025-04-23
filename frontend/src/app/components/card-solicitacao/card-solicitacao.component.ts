import { Component, EventEmitter, Input, Output } from '@angular/core';
import { materialImports } from '../../material-imports';
import { CommonModule } from '@angular/common';
import { SolicitacaoService } from '../../services/solicitacao.service';

@Component({
  selector: 'app-card-solicitacao',
  imports: [...materialImports, CommonModule],
  templateUrl: './card-solicitacao.component.html',
  styleUrl: './card-solicitacao.component.css'
})
export class CardSolicitacaoComponent {
  @Input() solicitacao: any;

  constructor(private solicitacaoService: SolicitacaoService) {}

  getBackgroundColor(): string {
    switch (this.solicitacao?.estado) {
      case 'ABERTA' : return 'var(--color-aberto)';
      case 'ORÇADA' : return 'var(--color-orcada)';
      case 'REJEITADA' : return 'var(--color-rejeitada)';
      case 'APROVADA' : return 'var(--color-aprovada)';
      case 'REDIRECIONADA' : return 'var(--color-redirecionada)';
      case 'ARRUMADA' : return 'var(--color-arrumada)';
      case 'PAGA' : return 'var(--color-paga)';
      case 'FINALIZADA' : return 'var(--color-finalizada)';
      default: return 'var(--color-aberto)';
    }
  }

  realizarAcao(novoEstado: string) {
    if (this.solicitacao) {
      this.solicitacaoService.atualizarSolicitacao(this.solicitacao.id, novoEstado);
    }
  }
}
