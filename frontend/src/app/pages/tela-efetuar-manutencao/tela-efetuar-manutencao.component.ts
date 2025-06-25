import { ModalEfetuarManutencaoComponent } from "./../../modals/modal-efetuar-manutencao/modal-efetuar-manutencao.component";
import { ModalRedirecionarComponent } from "./../../modals/modal-redirecionar/modal-redirecionar.component";
import { Component, Input, OnInit } from "@angular/core";
import { materialImports } from "../../material-imports";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterLink, ActivatedRoute } from "@angular/router";
import { SolicitacaoService } from "../../services/solicitacao/solicitacao.service";
import {
  SolicitacaoComHistoricoDTO,
  EfetuarManutencaoDTO,
  RedirecionarSolicitacaoDTO,
} from "../../models/solicitacao-dto.model";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../services/auth/auth.service";
import { ManutencaoConfirmadaEvent } from "../../modals/modal-efetuar-manutencao/modal-efetuar-manutencao.component";
import { ModalErroComponent } from "../../modals/modal-erro/modal-erro.component";

@Component({
  selector: "app-tela-efetuar-manutencao",
  standalone: true,
  imports: [
    ...materialImports,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule,
    ModalEfetuarManutencaoComponent,
    ModalRedirecionarComponent,
  ],
  templateUrl: "./tela-efetuar-manutencao.component.html",
  styleUrl: "./tela-efetuar-manutencao.component.css",
})
export class TelaEfetuarManutencaoComponent implements OnInit {
  modalManutencaoAberto = false;
  modalRedirecionarAberto = false;
  solicitacao!: SolicitacaoComHistoricoDTO;
  isLoaded = false;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idDaRota: string = params["id"];

      if (!idDaRota) {
        this.isLoaded = true;
        return;
      }

      this.isLoaded = false;
      this.solicitacaoService.fetchDetalhesSolicitacao(idDaRota).subscribe({
        next: (dados) => {
          if (dados) {
            this.solicitacao = dados;
            this.solicitacao.idFormatado =
              "OS-" + String(this.solicitacao.numeroOs).padStart(4, "0");
          }
        },
        complete: () => {
          this.isLoaded = true;
        },
      });
    });
  }

  abrirModalManutencao() {
    this.modalManutencaoAberto = true;
  }

  fecharModalManutencao() {
    this.modalManutencaoAberto = false;
  }

  onManutencaoConfirmada(evento: ManutencaoConfirmadaEvent) {
    if (!this.solicitacao?.id) {
      this.fecharModalManutencao();
      return;
    }

    const dadosParaBackend: any = {
      idSolicitacao: this.solicitacao.id,
      descricao_manutencao: evento.descricaoManutencao,
      orientacoes_cliente: evento.orientacoesCliente,
    };

    this.solicitacaoService.efetuarManutencao(dadosParaBackend).subscribe({
      next: () => {
        this.fecharModalManutencao();
        this.router.navigate(["/home"]);
      },
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
      const mensagem =
        "Não é possível redirecionar: dados da solicitação ou do funcionário de origem ausentes.";
      this.dialog.open(ModalErroComponent, {
        data: { mensagem },
      });
      return;
    }

    const dadosRedirecionamento: RedirecionarSolicitacaoDTO = {
      idSolicitacao: this.solicitacao.id,
      idFuncionarioOrigem: idFuncionarioOrigem,
      idFuncionarioDestino: idFuncionarioDestino,
    };

    this.solicitacaoService
      .redirecionarSolicitacao(dadosRedirecionamento)
      .subscribe({
        next: () => {
          this.fecharModalRedirecionar();
          this.router.navigate(["/home"]);
        },
      });
  }
}
