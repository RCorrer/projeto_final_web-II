import { Component } from '@angular/core';
import { materialImports } from '../../material-imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-solicitacao',
  imports: [...materialImports, CommonModule],
  templateUrl: './card-solicitacao.component.html',
  styleUrl: './card-solicitacao.component.css'
})
export class CardSolicitacaoComponent {
  backgroundColor: string = 'var(--color-aberto)';
}
