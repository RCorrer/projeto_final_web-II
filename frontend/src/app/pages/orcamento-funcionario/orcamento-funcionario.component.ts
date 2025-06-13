import { Component, Input, OnInit } from '@angular/core';
import { materialImports } from '../../material-imports';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao/solicitacao.service';
import { Observable, of } from 'rxjs';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SolicitacaoComHistoricoDTO } from '../../models/solicitacao-dto.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: "app-orcamento-funcionario",
  imports: [...materialImports, MatInputModule, FormsModule, CommonModule, NavbarComponent, MatButtonModule, RouterLink],
  providers: [CurrencyPipe],
  templateUrl: "./orcamento-funcionario.component.html",
  styleUrl: "./orcamento-funcionario.component.css",
})

export class OrcamentoFuncionarioComponent implements OnInit{
  solicitacao!: SolicitacaoComHistoricoDTO;
  isLoaded = false;
  
  valorOrcamento: string = '';

  constructor(
    public currencyPipe: CurrencyPipe, 
    private solicitacaoService: SolicitacaoService, 
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idDaRota: string = params['id']; 

      if (!idDaRota) {
        console.error("orcamento-funcionario: ID da solicitação não encontrado na rota!");
        this.isLoaded = true;
        return;
      }
      
      this.isLoaded = false; // Inicia o carregamento
      this.solicitacaoService.fetchDetalhesSolicitacao(idDaRota).subscribe({
        next: (dados) => {
          if (dados) {
            this.solicitacao = dados;
            
            this.solicitacao.idFormatado = 'OS-' + String(this.solicitacao.numeroOs).padStart(4, '0');
            
            // Se já houver um orçamento, preenche o campo de input com o valor formatado
            if (this.solicitacao.orcamento && this.solicitacao.orcamento > 0) {
              this.valorOrcamento = this.currencyPipe.transform(this.solicitacao.orcamento, "BRL", "symbol", "1.2-2") || "";
            }

          } else {
            console.error(`orcamento-funcionario: Solicitação com ID ${idDaRota} não foi encontrada no backend.`);
            // Adicionar lógica para lidar com solicitação não encontrada, como redirecionar
            // this.router.navigate(['/pagina-nao-encontrada']);
          }
        },
        error: (err) => {
          console.error('Erro ao buscar detalhes da solicitação:', err);
          this.isLoaded = true;
        },
        complete: () => {
          this.isLoaded = true; // Finaliza o carregamento após sucesso
        }
      });
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

}
