import { Component, Input } from "@angular/core";
import { SolicitacaoService } from "../../services/solicitacao/solicitacao.service";
import { Router, RouterLink, ActivatedRoute } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import {
  HistoricoAlteracaoDTO,
  SolicitacaoComHistoricoDTO,
} from "../../models/solicitacao-dto.model";
import { MatDialog } from "@angular/material/dialog";
import { ModalOrientacoesComponent } from "../../modals/modal-orientacoes/modal-orientacoes.component";

interface Etapa {
  nome: string;
  estado: "completo" | "ativo" | "incompleto";
  dataHora?: string;
  funcionarioNome?: string;
}

@Component({
  selector: "app-tela-visualizar",
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: "./tela-visualizar.component.html",
  styleUrl: "./tela-visualizar.component.css",
})
export class TelaVisualizarComponent {
  @Input() solicitacao!: SolicitacaoComHistoricoDTO;
  @Input() funcionario!: HistoricoAlteracaoDTO;

  isLoaded = false;
  estado!: number;

  etapas: Etapa[] = [];
  private mapaDeEstados: { [key: string]: string } = {
    "1": "ABERTA",
    "2": "ORÇADA",
    "3": "APROVADA",
    "4": "REJEITADA",
    "5": "REDIRECIONADA",
    "6": "ARRUMADA",
    "7": "PAGA",
    "8": "FINALIZADA",
    "9": "ENTREGADA",
  };
  etapasNormais = ["1", "2", "3", "6", "7", "8"];
  etapaRejeitada = "4";

  constructor(
    private solicitacaoService: SolicitacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idDaRota: string = params["id"];

      if (!idDaRota) {
        console.error(
          "TelaVisualizarComponent: ID da solicitação não encontrado na rota!"
        );
        this.isLoaded = true;
        return;
      }

      this.isLoaded = false;
      this.solicitacaoService.fetchDetalhesSolicitacao(idDaRota).subscribe({
        next: (dados) => {
          if (dados) {
            this.solicitacao = dados;

            this.estado = Number(this.solicitacao.estado); // <- NOVO: define o valor para o template

            this.solicitacao.idFormatado =
              "OS-" + String(this.solicitacao.numeroOs).padStart(4, "0");

            this.atualizarEtapas();
          } else {
            console.error(
              `TelaVisualizarComponent: Solicitação com ID ${idDaRota} não foi encontrada no backend.`
            );
          }
        },
        error: (err) => {
          console.error("Erro ao buscar detalhes da solicitação:", err);
          this.isLoaded = true;
        },
        complete: () => {
          this.isLoaded = true;
        },
      });
    });
  }

  private atualizarEtapas(): void {
    const estadoAtual = this.solicitacao.estado;
    const historico = this.solicitacao.historico;
    const historicoIds = historico.map((h) => h.estadoNovo);
    const temRejeitada = historicoIds.includes(this.etapaRejeitada);

    const mapaDeDatas = new Map<string, string>();
    const mapaDeFuncionarios = new Map<string, string>();

    historico.forEach((h) => {
      mapaDeDatas.set(h.estadoNovo, h.dataHora);

      if (["2", "6", "8"].includes(h.estadoNovo)) {
        if (h.estadoNovo === "6") {
          mapaDeFuncionarios.set(
            "6",
            h.funcionarioRedirecionado || this.solicitacao.funcionarioNome
          );
        } else {
          mapaDeFuncionarios.set(
            h.estadoNovo,
            this.solicitacao.funcionarioNome
          );
        }
      }
    });

    this.etapas = [];

    if (estadoAtual === this.etapaRejeitada) {
      const etapasAteRejeicao: Etapa[] = [];
      const orcou = historicoIds.includes("2");

      etapasAteRejeicao.push({
        nome: this.mapaDeEstados["1"],
        estado: "completo",
      });

      if (orcou) {
        etapasAteRejeicao.push({
          nome: this.mapaDeEstados["2"],
          estado: "completo",
          funcionarioNome: mapaDeFuncionarios.get("2") ?? undefined,
          dataHora: mapaDeDatas.get("2") ?? undefined,
        });
      }

      etapasAteRejeicao.push({
        nome: this.mapaDeEstados[this.etapaRejeitada],
        estado: "ativo",
        dataHora: mapaDeDatas.get("4") ?? undefined,
      });

      this.etapas = etapasAteRejeicao;
      return;
    }

    for (let i = 0; i < this.etapasNormais.length; i++) {
      const etapaNome = this.etapasNormais[i];

      if (etapaNome === "3" && temRejeitada) {
        this.etapas.push({
          nome: this.mapaDeEstados[this.etapaRejeitada],
          estado: estadoAtual === "REJEITADA" ? "ativo" : "completo",
          dataHora: mapaDeDatas.get("4"),
        });
      }

      this.etapas.push({
        nome: this.mapaDeEstados[etapaNome],
        estado: this.getEstadoEtapa(etapaNome, estadoAtual, i),
        dataHora: mapaDeDatas.get(etapaNome),
        funcionarioNome: mapaDeFuncionarios.get(etapaNome),
      });
    }
  }

  private getEstadoEtapa(
    etapaNome: string,
    estadoAtual: string,
    index: number
  ): "completo" | "ativo" | "incompleto" {
    const estadoIndex = this.etapasNormais.indexOf(estadoAtual);
    const etapaIndex = this.etapasNormais.indexOf(etapaNome);

    if (estadoAtual === this.etapaRejeitada) {
      return "incompleto";
    }

    if (estadoIndex === -1) {
      const historicoIds = this.solicitacao.historico.map((h) => h.estadoNovo);
      if (historicoIds.includes(etapaNome)) {
        return "completo";
      }
      return "incompleto";
    }

    if (etapaIndex < estadoIndex) {
      return "completo";
    } else if (etapaIndex === estadoIndex) {
      return "ativo";
    } else {
      return "incompleto";
    }
  }

  abrirModalOrientacoes() {
    this.dialog.open(ModalOrientacoesComponent, {
      data: {
        descricaoManutencao: this.solicitacao.descricao_manutencao,
        orientacoesCliente: this.solicitacao.orientacoes_cliente,
      },
    });
  }
}
