import { Component, Input, OnInit } from '@angular/core';
import { materialImports } from '../../../material-imports';
import { CommonModule } from '@angular/common';
import { Solicitacao } from '../../../models/Solicitacao.model';
import { DataBrasileiraPipe } from '../../../shared/data-brasileira.pipe';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-solicitacao',
  imports: [...materialImports, CommonModule, DataBrasileiraPipe, RouterLink, RouterModule],
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

  formatarData(data: string): string {
    if (!data) return 'Data inválida';
    
    try {
      const dateObj = new Date(data);
      
      if (isNaN(dateObj.getTime())) {
        return 'Data inválida';
      }
      
      const dia = dateObj.getDate().toString().padStart(2, '0');
      const mes = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const ano = dateObj.getFullYear();
      
      return `${dia}/${mes}/${ano}`;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data inválida';
    }
  }
  
  formatarHora(data: string): string {
    if (!data) return 'Hora inválida';
    
    try {
      const dateObj = new Date(data);
      
      if (isNaN(dateObj.getTime())) {
        return 'Hora inválida';
      }
      
      const horas = dateObj.getHours().toString().padStart(2, '0');
      const minutos = dateObj.getMinutes().toString().padStart(2, '0');
      
      return `${horas}:${minutos}`;
    } catch (error) {
      console.error('Erro ao formatar hora:', error);
      return 'Hora inválida';
    }
  }
}
