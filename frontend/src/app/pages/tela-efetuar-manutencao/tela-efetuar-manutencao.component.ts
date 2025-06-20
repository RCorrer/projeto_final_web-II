import { ModalRedirecionarComponent } from './../../modals/modal-redirecionar/modal-redirecionar.component';
import { Component, Input, OnInit } from '@angular/core';
import { materialImports } from '../../material-imports';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao/solicitacao.service';
import { SolicitacaoComHistoricoDTO, EfetuarManutencaoDTO, RedirecionarSolicitacaoDTO } from '../../models/solicitacao-dto.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-tela-efetuar-manutencao',
  standalone: true,
  imports: [...materialImports, MatInputModule, FormsModule, CommonModule, MatButtonModule, RouterLink, MatProgressSpinnerModule, ModalRedirecionarComponent],
  templateUrl: './tela-efetuar-manutencao.component.html',
  styleUrl: './tela-efetuar-manutencao.component.css'
})
export class TelaEfetuarManutencaoComponent implements OnInit {
  modalRedirecionarAberto = false;
  solicitacao!: SolicitacaoComHistoricoDTO;
  isLoaded = false;
  descricaoManutencao: string = '';
  orientacoesCliente: string = '';

  constructor(
    private solicitacaoService: SolicitacaoService, 
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService
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

  abrirModalRedirecionar() {
    this.modalRedirecionarAberto = true;
  }

  fecharModalRedirecionar() {
    this.modalRedirecionarAberto = false;
  }

  onRedirecionamentoConfirmado(idFuncionarioDestino: string) {
    const idFuncionarioOrigem = this.authService.getIdRole();

    if (!this.solicitacao || !idFuncionarioOrigem) {
      console.error("Não é possível redirecionar: dados da solicitação ou do funcionário de origem ausentes.");
      return;
    }

    const dadosRedirecionamento: RedirecionarSolicitacaoDTO = {
      idSolicitacao: this.solicitacao.id,
      idFuncionarioOrigem: idFuncionarioOrigem,
      idFuncionarioDestino: idFuncionarioDestino
    };

    this.solicitacaoService.redirecionarSolicitacao(dadosRedirecionamento).subscribe({
      next: response => {
        console.log("Redirecionamento bem-sucedido:", response);
        this.fecharModalRedirecionar();
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error("Erro no redirecionamento:", err);
        this.fecharModalRedirecionar();
      }
    });
  }
}