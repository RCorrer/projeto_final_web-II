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
import { ModalMotivoRejeicaoComponent } from "../../modals/modal-motivo-rejeicao/modal-motivo-rejeicao.component";
import { CpfPipe } from "../../shared/cpf.pipe";
import { CepPipe } from "../../shared/cep.pipe";

interface Etapa {
  nome: string;
  estado: "completo" | "ativo" | "incompleto";
  dataHora?: string;
  funcionarioNome?: string;
}

@Component({
  selector: "app-tela-visualizar",
  imports: [CommonModule, RouterLink, DatePipe, CpfPipe, CepPipe],
  templateUrl: "./tela-visualizar.component.html",
  styleUrl: "./tela-visualizar.component.css",
})
export class TelaVisualizarComponent {
  @Input() solicitacao!: SolicitacaoComHistoricoDTO;
  @Input() funcionario!: HistoricoAlteracaoDTO;

  isLoaded = false;
  motivoRejeicao: string | null = null;
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
        this.isLoaded = true;
        return;
      }

      this.isLoaded = false;
      this.solicitacaoService.fetchDetalhesSolicitacao(idDaRota).subscribe({
        next: (dados) => {
          if (dados) {
            this.solicitacao = dados;

            this.extrairMotivoRejeicao();

            this.estado = Number(this.solicitacao.estado);

            this.solicitacao.idFormatado =
              "OS-" + String(this.solicitacao.numeroOs).padStart(4, "0");

            this.atualizarEtapas();
          }
        },
        error: (err) => {
          this.isLoaded = true;
        },
        complete: () => {
          this.isLoaded = true;
        },
      });
    });
  }

  private extrairMotivoRejeicao(): void {
    const historico = this.solicitacao.historico;

    const entradaRejeitada = historico.find((h) =>
      h.descricao?.toLowerCase().includes("motivo:")
    );

    if (entradaRejeitada) {
      const partes = entradaRejeitada.descricao.split("Motivo:");
      if (partes.length > 1) {
        this.motivoRejeicao = partes[1].trim();
      }
    }
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
        const desc = h.descricao.toLowerCase();

        if (h.estadoNovo === "2" && desc.includes("orçamento de")) {
          const nome =
            h.funcionarioRedirecionado ?? this.solicitacao.funcionarioNome;
          mapaDeFuncionarios.set("2", nome);
        }

        if (h.estadoNovo === "6" && desc.includes("arrumada")) {
          const nome =
            h.funcionarioRedirecionado ?? this.solicitacao.funcionarioNome;
          mapaDeFuncionarios.set("6", nome);
        }

        if (h.estadoNovo === "8" && desc.includes("finalizada")) {
          const nome =
            h.funcionarioRedirecionado ?? this.solicitacao.funcionarioNome;
          mapaDeFuncionarios.set("8", nome);
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
          estado: "completo",
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

  abrirModalMotivoRejeicao() {
    if (!this.motivoRejeicao) return;
    this.dialog.open(ModalMotivoRejeicaoComponent, {
      data: { motivo: this.motivoRejeicao },
    });
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
