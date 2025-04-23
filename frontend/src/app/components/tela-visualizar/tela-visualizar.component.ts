import { Component, Input } from '@angular/core';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tela-visualizar',
  imports: [MatButton, CommonModule, RouterLink],
  templateUrl: './tela-visualizar.component.html',
  styleUrl: './tela-visualizar.component.css'
})
export class TelaVisualizarComponent {
  @Input() solicitacao: any;
  isLoaded = false;

  constructor (private solicitacaoService: SolicitacaoService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      const solicitacaoExistente = this.solicitacaoService.getSolicitacaoById(id);

      this.solicitacao = this.mergeWithDefault(solicitacaoExistente || { id });

      this.solicitacao.idFormatado = 'OS-' + this.solicitacao.id.toString().padStart(6, '0');

      setTimeout(() => {
        this.isLoaded = true;
      }, 100);
    });
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
      estado: solicitacao.estado || 'ABERTA',
      dataHora: solicitacao.dataHora || new Date().toISOString()
    };
  }
}
