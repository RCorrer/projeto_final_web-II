import { Component } from '@angular/core';
import { materialImports } from '../../material-imports';
import { CardSolicitacaoComponent } from '../card-solicitacao/card-solicitacao.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tela-inicial-funcionario',
  imports: [...materialImports, CardSolicitacaoComponent, NavbarComponent, CommonModule],
  templateUrl: './tela-inicial-funcionario.component.html',
  styleUrl: './tela-inicial-funcionario.component.css'
})
export class TelaInicialFuncionarioComponent {
  solicitacoes: any[] = [];

  constructor(private solicitacaoService: SolicitacaoService) {}

  ngOnInit() {
    this.solicitacaoService.solicitacoes$.subscribe(solicitacoes => {
      this.solicitacoes = solicitacoes
        .sort((a, b) => new Date (b.dataHora).getTime() - new Date (a.dataHora).getTime());
    });
  }
}
