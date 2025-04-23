import { Component, Input, OnInit } from '@angular/core';
import { materialImports } from '../../material-imports';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Observable, of } from 'rxjs';

@Component({
  imports: [...materialImports, MatInputModule, FormsModule, CommonModule, NavbarComponent, MatButtonModule, RouterLink],
  providers: [CurrencyPipe],
  templateUrl: './orcamento-funcionario.component.html',
  styleUrl: './orcamento-funcionario.component.css'
})

export class OrcamentoFuncionarioComponent implements OnInit{
  @Input() solicitacao: any;
  
  valorOrcamento: string = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      const solicitacaoExistente = this.solicitacaoService.getSolicitacaoById(id);

      if (solicitacaoExistente) {
        this.solicitacao = solicitacaoExistente;
      } else {
        this.solicitacao = {
          id: id,
          equipamento: 'Teclado DELL KB216 USB',
          problema: 'Teclas ctrl, alt e del não funcionam, espaço solto e barulhento.',
          cliente: {
            nome: 'Joana Joaquina',
            cpf: '000.000.000-00',
            email: 'joana.joaquina@gmail.com',
            telefone: '(00) 00000-0000',
            endereco: {
              cep: '00000-000',
              logradouro: 'R. Dr. Alcides Vieira Arcoverde, 1225',
              complemento: 'Bloco A',
              cidade: 'Curitiba',
              estado: 'Paraná'
            }
          },
          estado: 'ABERTA'
        };
      }
    });
  }

  constructor(public currencyPipe: CurrencyPipe, private solicitacaoService: SolicitacaoService, private router: Router, private route: ActivatedRoute) {}

  formatarMoeda() {
    let valor = this.valorOrcamento.replace(/\D/g, '');
    let valorFormatado = (Number(valor) / 100).toFixed(2);
    this.valorOrcamento = this.currencyPipe.transform(valorFormatado, 'BRL', 'symbol', '1.2-2') || '';
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
}
