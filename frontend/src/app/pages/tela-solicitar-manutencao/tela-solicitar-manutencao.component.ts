import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao/solicitacao.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-tela-solicitar-manutencao',
  imports: [CommonModule, MatButtonModule, MatFormField, MatInputModule, MatSelect, MatOption, RouterLink, FormsModule],
  templateUrl: './tela-solicitar-manutencao.component.html',
  styleUrl: './tela-solicitar-manutencao.component.css'
})
export class TelaSolicitarManutencaoComponent {
  equipamento: string = '';
  categoria: string = '';
  defeito: string = '';

  mostrarRejeicao = false;

  constructor(private solicitacaoService: SolicitacaoService, private router: Router, private authService: AuthService) {}

  abrirSolicitacao() {
    const nomeClienteLogado = this.authService.getUserName();
    const idClienteLogado = this.authService.getUserId();

    if (this.equipamento && this.categoria && this.defeito && nomeClienteLogado) {
      this.solicitacaoService.adicionarSolicitacao({
        equipamento: this.equipamento,
        categoria: this.categoria,
        defeito: this.defeito,
        cliente: nomeClienteLogado,
      });

      this.router.navigate(['/home-cliente']);
    }
  }

  mostarModalRejeitar(){
    this.mostrarRejeicao = true;
  }

  cancelarRejeicao(){
    this.mostrarRejeicao = false;
  }

  confirmarRejeicao(){
    this.mostrarRejeicao = false;
  }
}
