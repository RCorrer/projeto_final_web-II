import { Component, Input } from '@angular/core';
import { SolicitacaoService } from '../../services/solicitacao/solicitacao.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Etapa {
  nome: string;
  estado: 'completo' | 'ativo' | 'incompleto';
}

@Component({
  selector: 'app-tela-visualizar',
  imports: [CommonModule, RouterLink],
  templateUrl: './tela-visualizar.component.html',
  styleUrl: './tela-visualizar.component.css'
})

export class TelaVisualizarComponent {
  @Input() solicitacao: any;
  isLoaded = false;

  etapas: Etapa[] = [];
  etapasNormais = ['ABERTA', 'ORÇADA', 'APROVADA', 'ARRUMADA', 'PAGA', 'FINALIZADA'];
  etapaRejeitada = 'REJEITADA';

  constructor (private solicitacaoService: SolicitacaoService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idDaRota: string = params['id'];

      if (!idDaRota) {
        console.error("TelaVisualizarComponent: ID da solicitação não encontrado na rota!");
        this.isLoaded = true; 
        return;
      }

      this.isLoaded = false;
      this.solicitacaoService.fetchDetalhesSolicitacao(idDaRota).subscribe({
        next: (dados) => {
          if (dados) {
            this.solicitacao = dados;
            
            this.solicitacao.idFormatado = 'OS-' + String(this.solicitacao.numeroOs).padStart(4, '0');
            
            this.atualizarEtapas();

          } else {
            console.error(`TelaVisualizarComponent: Solicitação com ID ${idDaRota} não foi encontrada no backend.`);
          }
        },
        error: (err) => {
          console.error('Erro ao buscar detalhes da solicitação:', err);
          this.isLoaded = true;
        },
        complete: () => {
          this.isLoaded = true;
        }
      });
    });
  }

  private atualizarEtapas(): void {
    const estadoAtual = this.solicitacao.estado;
    const temRejeitada = estadoAtual === 'REJEITADA' || 
                        (this.solicitacao.historicoEstados && 
                         this.solicitacao.historicoEstados.includes('REJEITADA'));
  
    this.etapas = [];
  
    for (let i = 0; i < this.etapasNormais.length; i++) {
      const etapaNome = this.etapasNormais[i];
      
      if (etapaNome === 'APROVADA' && temRejeitada) {
        this.etapas.push({
          nome: this.etapaRejeitada,
          estado: estadoAtual === 'REJEITADA' ? 'ativo' : 'completo'
        });
      }
  
      this.etapas.push({
        nome: etapaNome,
        estado: this.getEstadoEtapa(etapaNome, estadoAtual, i)
      });
    }
  
    if (estadoAtual === 'REJEITADA') {
      const indexRejeitada = this.etapas.findIndex(e => e.nome === 'REJEITADA');
      this.etapas = this.etapas.slice(0, indexRejeitada + 1);
    }
  }

  private getEstadoEtapa(etapaNome: string, estadoAtual: string, index: number): 'completo' | 'ativo' | 'incompleto' {
    const estadoIndex = this.etapasNormais.indexOf(estadoAtual);
    const etapaIndex = this.etapasNormais.indexOf(etapaNome);
  
    if (estadoAtual === 'REJEITADA') {
      return 'incompleto';
    }
  
    if (etapaIndex < estadoIndex) {
      return 'completo';
    } else if (etapaNome === estadoAtual) {
      return 'ativo';
    } else {
      return 'incompleto';
    }
  }
}
