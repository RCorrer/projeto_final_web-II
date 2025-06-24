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
import { OrcamentoDTO, SolicitacaoComHistoricoDTO } from '../../models/solicitacao-dto.model';
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
        this.isLoaded = true;
        return;
      }
      
      this.isLoaded = false;
      this.solicitacaoService.fetchDetalhesSolicitacao(idDaRota).subscribe({
        next: (dados) => {
          if (dados) {
            this.solicitacao = dados;            
            this.solicitacao.idFormatado = 'OS-' + String(this.solicitacao.numeroOs).padStart(4, '0');
            
            if (this.solicitacao.orcamento && this.solicitacao.orcamento > 0) {
              this.valorOrcamento = this.currencyPipe.transform(this.solicitacao.orcamento, "BRL", "symbol", "1.2-2") || "";
            }
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

  formatarMoeda() {
    let valor = this.valorOrcamento.replace(/\D/g, "");
    let valorFormatado = (Number(valor) / 100).toFixed(2);
    this.valorOrcamento =
      this.currencyPipe.transform(valorFormatado, "BRL", "symbol", "1.2-2") ||
      "";
  }

  enviarOrcamento() {
    if (!this.solicitacao || !this.valorOrcamento) {
      console.error("Por favor, preencha o valor do orçamento.");
      return;
    }
    
    const valorNumerico = parseFloat(this.valorOrcamento.replace(/[^0-9,]/g, '').replace(',', '.'));
    
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
        console.error("Valor do orçamento inválido.");
        return;
    }

    const orcamentoData: OrcamentoDTO = {
      id: this.solicitacao.id,
      valor: valorNumerico,
    };

    this.solicitacaoService.enviarOrcamento(orcamentoData).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro ao enviar o orçamento:', err);
      }
    });
  }
}
