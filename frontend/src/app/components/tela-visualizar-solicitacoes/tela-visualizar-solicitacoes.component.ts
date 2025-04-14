import { Component } from '@angular/core';
import { materialImports } from '../../material-imports';
import { CardSolicitacaoComponent } from '../card-solicitacao/card-solicitacao.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-tela-visualizar-solicitacoes',
  imports: [...materialImports, CardSolicitacaoComponent, NavbarComponent],
  templateUrl: './tela-visualizar-solicitacoes.component.html',
  styleUrl: './tela-visualizar-solicitacoes.component.css'
})
export class TelaVisualizarSolicitacoesComponent {

}
