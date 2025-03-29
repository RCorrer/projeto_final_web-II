import { Component } from '@angular/core';
import { materialImports } from '../../material-imports';
import { CardSolicitacaoComponent } from '../card-solicitacao/card-solicitacao.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-tela-inicial-funcionario',
  imports: [...materialImports, CardSolicitacaoComponent, NavbarComponent],
  templateUrl: './tela-inicial-funcionario.component.html',
  styleUrl: './tela-inicial-funcionario.component.css'
})
export class TelaInicialFuncionarioComponent {

}
