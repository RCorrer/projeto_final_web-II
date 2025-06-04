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

  backgroundColor: string = 'var(--color-aberto)';

  constructor(private solicitacaoService: SolicitacaoService) {}

  ngOnInit(): void {

    if (this.solicitacao && this.solicitacao.estado) {
      this.backgroundColor = this.getColor(this.solicitacao.estado);
    } else {
      console.warn('CardSolicitacaoComponent: Solicitação ou estado da solicitação indefinido no ngOnInit.');
      this.backgroundColor = 'gray';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['solicitacao'] && this.solicitacao && this.solicitacao.estado) {
      this.backgroundColor = this.getColor(this.solicitacao.estado);
    }
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
        console.warn(`CardSolicitacaoComponent: Estado desconhecido '${estadoId}' para getColor.`);
        return 'gray';
    }
  }

  realizarAcao(novoEstadoId: string) {
    if (this.solicitacao && this.solicitacao.id) {
      console.log(`CardSolicitacao: Ação para OS ${this.solicitacao.id}, novo estado ID: ${novoEstadoId}`);
      this.solicitacaoService.atualizarSolicitacao(this.solicitacao.id, novoEstadoId)
        .subscribe({
          next: (response) => {
            if (response && response.success) {
              console.log(`CardSolicitacao: Mock de atualização para estado ${novoEstadoId} bem-sucedido.`);
            } else {
              console.error('CardSolicitacao: Falha no mock de atualização de estado.');
            }
          },
          error: (err) => {
            console.error('CardSolicitacao: Erro ao tentar atualizar estado (mock):', err);
          }
        });
    } else {
      console.error('CardSolicitacao: Tentativa de realizar ação sem solicitação ou ID de solicitação.');
    }
  }

  realizarAcaoNoBackend(acao: string, novoEstadoSeNecessario?: string) {
    if (!this.solicitacao || !this.solicitacao.id) {
      console.error('CardSolicitacaoComponent: Tentativa de realizar ação sem solicitação ou ID.');
      return;
    }

    switch (acao) {
      case 'efetuarOrcamento': 
        this.orcamentoAcao.emit(this.solicitacao.id);
        break;
      case 'efetuarManutencao': 
        this.visualizarAcao.emit(this.solicitacao.id); 
        break;
      case 'finalizarSolicitacao': 
        if (novoEstadoSeNecessario) {
             this.solicitacaoService.atualizarSolicitacao(this.solicitacao.id, novoEstadoSeNecessario).subscribe(res => {
                 console.log("Mock: Ação realizada para OS " + this.solicitacao.id + ", novo estado: " + novoEstadoSeNecessario, res);
             });
        }
        break;
      default:
        console.warn(`CardSolicitacaoComponent: Ação desconhecida '${acao}'`);
    }
  }
}