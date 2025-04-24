import { Component, Input } from '@angular/core';
import { SolicitacaoService } from '../../services/solicitacao.service';
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
      const id = +params['id'];
      const solicitacaoExistente = this.solicitacaoService.getSolicitacaoById(id);

      this.solicitacao = this.mergeWithDefault(solicitacaoExistente || { id });

      this.solicitacao.idFormatado = 'OS-' + this.solicitacao.id.toString().padStart(6, '0');

      this.atualizarEtapas();

      setTimeout(() => {
        this.isLoaded = true;
      }, 100);
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

  private mergeWithDefault(solicitacao: any): any {
    const cliente = typeof solicitacao.cliente === 'string' 
      ? { nome: solicitacao.cliente }
      : solicitacao.cliente || {};
  
    const endereco = cliente.endereco || {};
    
    return {
      id: solicitacao.id || 0,
      idFormatado: 'OS-' + (solicitacao.id || 0).toString().padStart(6, '0'),
      equipamento: solicitacao.equipamento || 'Teclado DELL KB216 USB',
      categoria: solicitacao.categoria || 'Periférico',
      problema: solicitacao.defeito || solicitacao.problema || 'N/A',
      cliente: {
        nome: cliente.nome || 'Joana Joaquina',
        cpf: cliente.cpf || '000.000.000-00',
        email: cliente.email || 'joana@gmail.com',
        telefone: cliente.telefone || '(00) 00000-0000',
        endereco: {
          cep: endereco.cep || '00000-000',
          logradouro: endereco.logradouro || 'Rua dos bobos',
          complemento: endereco.complemento || 'N/A',
          cidade: endereco.cidade || 'Bobolópolis',
          estado: endereco.estado || 'Bobolândia'
        }
      },
      estado: solicitacao.estado === 'ORCADA' ? 'ORÇADA' : solicitacao.estado || 'ABERTA',
      dataHora: solicitacao.dataHora || new Date().toISOString()
    };
  }
}
