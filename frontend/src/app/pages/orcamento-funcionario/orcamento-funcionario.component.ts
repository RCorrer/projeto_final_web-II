import { Component, Input, OnInit } from '@angular/core';
import { materialImports } from '../../material-imports';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Observable, of } from 'rxjs';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: "app-orcamento-funcionario",
  imports: [...materialImports, MatInputModule, FormsModule, CommonModule, NavbarComponent, MatButtonModule, RouterLink],
  providers: [CurrencyPipe],
  templateUrl: "./orcamento-funcionario.component.html",
  styleUrl: "./orcamento-funcionario.component.css",
})

export class OrcamentoFuncionarioComponent implements OnInit{
  @Input() solicitacao: any;
  isLoaded = false;
  
  valorOrcamento: string = '';

  constructor(public currencyPipe: CurrencyPipe, private solicitacaoService: SolicitacaoService, private router: Router, private route: ActivatedRoute) {}

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

  formatarMoeda() {
    let valor = this.valorOrcamento.replace(/\D/g, "");
    let valorFormatado = (Number(valor) / 100).toFixed(2);
    this.valorOrcamento =
      this.currencyPipe.transform(valorFormatado, "BRL", "symbol", "1.2-2") ||
      "";
  }

  enviarOrcamento() {
    const dataHoraAtual = new Date();

    const registroOrcamento = {
      valor: this.valorOrcamento,
      funcionario: 'Funcionario logado',
      dataHora: dataHoraAtual.toLocaleString('pt-BR')
    };

    console.log('BUM! ENVIADO! Orçamento registrado: ', registroOrcamento);
  };

  realizarAcao(novoEstado: string): Observable<any> {
    if (this.solicitacao) {
      this.enviarOrcamento();
      this.solicitacao.estado = novoEstado;
      this.solicitacaoService.atualizarSolicitacao(this.solicitacao.id, novoEstado)
        .subscribe ({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Erro ao atualizar:', err);
            this.solicitacao.estado = 'ABERTA';
          }
        });
    }

    return of({ success: true});
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
