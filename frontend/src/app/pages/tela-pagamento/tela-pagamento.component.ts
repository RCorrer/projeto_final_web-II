import { Component, Input } from "@angular/core";
import { SolicitacaoService } from "../../services/solicitacao/solicitacao.service";
import { Router, RouterLink, ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "../../../environments/environment";
import { ModalErroComponent } from "../../modals/modal-erro/modal-erro.component";
import { ModalOrientacoesComponent } from "../../modals/modal-orientacoes/modal-orientacoes.component";
import { SolicitacaoComHistoricoDTO } from "../../models/solicitacao-dto.model";

@Component({
  selector: "app-tela-pagamento",
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: "./tela-pagamento.component.html",
  styleUrl: "./tela-pagamento.component.css",
})
export class TelaPagamentoComponent {
  apiUrl = environment.apiURL + "/solicitacao/atualizarEstado/paga";

  @Input() solicitacao!: SolicitacaoComHistoricoDTO;
  isLoaded = false;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idDaRota: string = params["id"];

      if (!idDaRota) {
        console.error(
          "tela-pagamento: ID da solicitação não encontrado na rota."
        );
        this.isLoaded = true;
        return;
      }

      this.solicitacaoService
        .fetchDetalhesSolicitacao(idDaRota)
        .subscribe((detalhes) => {
          if (detalhes) {
            this.solicitacao = {
              ...detalhes,
              idFormatado: "OS-" + String(detalhes.numeroOs).padStart(6, "0"),
            };
          } else {
            console.warn(
              `tela-pagamento: solicitação com ID ${idDaRota} não encontrada no backend.`
            );
            this.solicitacao = this.mergeWithDefault({
              id: idDaRota,
              estado: "DESCONHECIDO",
            });
          }

          this.isLoaded = true;
        });
    });
  }

  private mergeWithDefault(solicitacao: any): any {
    const cliente =
      typeof solicitacao.cliente === "string"
        ? { nome: solicitacao.cliente }
        : solicitacao.cliente || {};

    const endereco = cliente.endereco || {};

    return {
      id: solicitacao.id || 0,
      idFormatado:
        "OS-" + (solicitacao.numeroOs || 0).toString().padStart(6, "0"),
      equipamento: solicitacao.equipamento || "Teclado DELL KB216 USB",
      categoria: solicitacao.categoria || "Periférico",
      problema: solicitacao.defeito || solicitacao.problema || "N/A",
      orcamento: solicitacao.orcamento || "R$ 0,00",
      cliente: {
        nome: cliente.nome || "Joana Joaquina",
        cpf: cliente.cpf || "000.000.000-00",
        email: cliente.email || "joana@gmail.com",
        telefone: cliente.telefone || "(00) 00000-0000",
        endereco: {
          cep: endereco.cep || "00000-000",
          logradouro: endereco.logradouro || "Rua dos bobos",
          complemento: endereco.complemento || "N/A",
          cidade: endereco.cidade || "Bobolópolis",
          estado: endereco.estado || "Bobolândia",
        },
      },
      estado:
        solicitacao.estado === "ORCADA"
          ? "ORÇADA"
          : solicitacao.estado || "ABERTA",
      dataHora: solicitacao.dataHora || new Date().toISOString(),
    };
  }

  pagarManutencao() {
    if (!this.verificarSeOrientacoesForamVistas()) {
      const mensagem =
        "Por favor, leia as orientações antes de efetuar o pagamento.";
      this.dialog.open(ModalErroComponent, {
        data: { mensagem },
      });
      return;
    }

    this.solicitacaoService.pagarSolicitacao(this.solicitacao.id).subscribe({
      next: (response) => {
        console.log("Solicitação paga com sucesso:", response);
        this.router.navigate(["/home-cliente"]);
      },
      error: (error) => {
        const mensagem =
          error?.error?.mensagem || "Erro ao pagar a solicitação.";
        this.dialog.open(ModalErroComponent, {
          data: { mensagem },
        });
      },
    });
  }

  abrirModalOrientacoes() {
    this.dialog.open(ModalOrientacoesComponent, {
      data: {
        descricaoManutencao: this.solicitacao.descricao_manutencao,
        orientacoesCliente: this.solicitacao.orientacoes_cliente,
      },
    });

    localStorage.setItem(`orientacoes-vistas-${this.solicitacao.id}`, "true");
  }

  verificarSeOrientacoesForamVistas(): boolean {
    return (
      localStorage.getItem(`orientacoes-vistas-${this.solicitacao.id}`) ===
      "true"
    );
  }
}
