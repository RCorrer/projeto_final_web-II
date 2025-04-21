import { Component, Input, OnInit } from '@angular/core';
import { materialImports } from '../../../material-imports';
import { CommonModule } from '@angular/common';
import { Solicitacao } from '../../../models/Solicitacao.model';

@Component({
  selector: 'app-card-solicitacao',
  imports: [...materialImports, CommonModule],
  templateUrl: './card-solicitacao.component.html',
  styleUrl: './card-solicitacao.component.css'
})

export class CardSolicitacaoComponent {
  @Input() solicitacao!: Solicitacao;

  backgroundColor: string = 'var(--color-aberto)';

  ngOnInit(): void {
    this.backgroundColor = this.getColor (this.solicitacao.estado);
  }

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

}
