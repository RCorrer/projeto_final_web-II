import { Component, Input, OnInit } from '@angular/core';
import { materialImports } from '../../material-imports';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao/solicitacao.service';
import { SolicitacaoComHistoricoDTO, EfetuarManutencaoDTO } from '../../models/solicitacao-dto.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-tela-efetuar-manutencao',
  standalone: true,
  imports: [...materialImports, MatInputModule, FormsModule, CommonModule, MatButtonModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './tela-efetuar-manutencao.component.html',
  styleUrl: './tela-efetuar-manutencao.component.css'
})
export class TelaEfetuarManutencaoComponent implements OnInit {
  solicitacao!: SolicitacaoComHistoricoDTO;
  isLoaded = false;
  descricaoManutencao: string = '';
  orientacoesCliente: string = '';

  constructor(
    private solicitacaoService: SolicitacaoService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idDaRota: string = params['id']; 

      if (!idDaRota) {
        console.error("tela-efetuar-manutencao: ID da solicitação não encontrado na rota!");
        this.isLoaded = true;
        return;
      }
      
      this.isLoaded = false;
      this.solicitacaoService.fetchDetalhesSolicitacao(idDaRota).subscribe({
        next: (dados) => {
          if (dados) {
            this.solicitacao = dados;
            this.solicitacao.idFormatado = 'OS-' + String(this.solicitacao.numeroOs).padStart(4, '0');
          } else {
            console.error(`tela-efetuar-manutencao: Solicitação com ID ${idDaRota} não foi encontrada.`);
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

  efetuarManutencao() {
    if (!this.solicitacao?.id) {
      console.error('Erro: Solicitação ou ID da solicitação inválido.');
      return;
    }

    // if (!this.solicitacao || !this.descricaoManutencao || !this.orientacoesCliente) {
    //   console.error("Por favor, preencha todos os campos da manutenção.");
    //   return;
    // }

    const dadosManutencao: EfetuarManutencaoDTO = {
      idSolicitacao: this.solicitacao.id,
      descricaoManutencao: this.descricaoManutencao || "Manutenção padrão realizada.", // placeholder
      orientacoesCliente: this.orientacoesCliente || "Nenhuma orientação específica." // placeholder
    };

    this.solicitacaoService.efetuarManutencao(dadosManutencao).subscribe({
      next: (response) => {
        console.log("Manutenção concluída com sucesso!", response);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro ao concluir a manutenção:', err);
      }
    });
  }

  redirecionarManutencao() {
    console.log('TODO: Implementar navegação para a tela de redirecionamento para a OS:', this.solicitacao.id);
  }
}