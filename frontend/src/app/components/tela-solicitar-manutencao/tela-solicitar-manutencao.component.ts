import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao.service';

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

  constructor(private solicitacaoService: SolicitacaoService, private router: Router) {}

  abrirSolicitacao() {
    if (this.equipamento && this.categoria && this.defeito) {
      this.solicitacaoService.adicionarSolicitacao({
        equipamento: this.equipamento,
        categoria: this.categoria,
        defeito: this.defeito,
        cliente: 'Maria Joaquina',
      });

      this.router.navigate(['/home-cliente']);
    }
  }
}
