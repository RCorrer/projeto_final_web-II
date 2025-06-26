import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { materialImports } from '../../../material-imports';
import { CommonModule } from '@angular/common';
import { Solicitacao } from '../../../models/Solicitacao.model';
import { DataFormatadaPipe } from '../../../shared/data-formatada.pipe';
import { SolicitacaoService } from '../../../services/solicitacao/solicitacao.service';
import { RouterLink, RouterModule } from '@angular/router';
import { HoraFormatadaPipe } from "../../../shared/hora-formatada.pipe";

@Component({
  selector: 'app-card-solicitacao',
  imports: [...materialImports, CommonModule, DataFormatadaPipe, RouterLink, RouterModule, HoraFormatadaPipe],
  templateUrl: './card-solicitacao.component.html',
  styleUrl: './card-solicitacao.component.css'
})
export class CardSolicitacaoComponent implements OnInit, OnChanges {
  @Input() solicitacao!: Solicitacao;

  @Output() visualizarAcao = new EventEmitter<string>();
  @Output() orcamentoAcao = new EventEmitter<string>();
  @Output() resgatarAcao = new EventEmitter<string>();
  @Output() pagarAcao = new EventEmitter<string>();
  @Output() finalizarAcao = new EventEmitter<string>();

  backgroundColor: string = 'var(--color-aberto)';

  constructor() {}

  ngOnInit(): void {

    if (this.solicitacao && this.solicitacao.estado) {
      this.backgroundColor = this.getColor(this.solicitacao.estado);
    } 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['solicitacao'] && this.solicitacao && this.solicitacao.estado) {
      this.backgroundColor = this.getColor(this.solicitacao.estado);
    }
  }

  public formatarNumeroOS(numero: number | undefined | null): string {
    if (!numero) {return '0000';}
    return numero.toString().padStart(4, '0');
  }

  getColor(estadoId: string): string {
    switch (estadoId) {
      case '1':
        return 'var(--color-aberto)';
      case '2':
        return 'var(--color-orcada)';
      case '4':
        return 'var(--color-rejeitada)';
      case '3':
        return 'var(--color-aprovada)';
      case '5':
        return 'var(--color-redirecionada)';
      case '6':
        return 'var(--color-arrumada)';
      case '7':
        return 'var(--color-paga)';
      case '8':
        return 'var(--color-finalizada)';
      default:
        return 'gray';
    }
  }

realizarAcao(acao: 'finalizar' | 'orcamento' | 'manutencao'): void {
    if (!this.solicitacao?.id) {
      return;
    }
    
    switch (acao) {
      case 'finalizar':
        this.finalizarAcao.emit(this.solicitacao.id);
        break;
        
      default:
        break;
    }
  }
}