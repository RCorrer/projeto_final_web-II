import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { tap, catchError, map } from "rxjs/operators";
import { Solicitacao } from "../../models/Solicitacao.model";
import { SolicitacaoFuncionarioBackendDTO } from "../../models/SolicitacaoFuncionarioBackendDTO.model";
import {
  EfetuarManutencaoDTO,
  MudarEstadoDTO,
  OrcamentoDTO,
  RedirecionarSolicitacaoDTO,
  SolicitacaoComHistoricoDTO,
} from "../../models/solicitacao-dto.model";
import { RespostaApi } from "../../models/respostaApi.model";

interface criacaoPayload {
  idCliente: string;
  descEquip: string;
  categoria: string;
  descDefeito: string;
}

@Injectable({
  providedIn: "root",
})
export class SolicitacaoService {
  private apiUrl = "http://localhost:8080";

  // Para a tela do CLIENTE
  private solicitacoesClienteSource = new BehaviorSubject<Solicitacao[]>([]);
  solicitacoesCliente$ = this.solicitacoesClienteSource.asObservable();

  // NOVO: Para a tela do FUNCIONÁRIO
  private solicitacoesFuncionarioSource = new BehaviorSubject<Solicitacao[]>(
    []
  );
  solicitacoesFuncionario$ = this.solicitacoesFuncionarioSource.asObservable();

  constructor(private http: HttpClient) {}

  // endpoint solicitacao
  fetchDetalhesSolicitacao(
    solicitacaoId: string
  ): Observable<SolicitacaoComHistoricoDTO | null> {
    if (!solicitacaoId) {
      console.error("SolicitacaoService: solicitacaoId não foi fornecido.");
      return of(null);
    }
    console.log(
      `SolicitacaoService: Buscando detalhes para solicitação ID: ${solicitacaoId}`
    );
    return this.http
      .get<SolicitacaoComHistoricoDTO>(
        `${this.apiUrl}/solicitacao/detalhes/${solicitacaoId}`
      )
      .pipe(
        // O DTO do backend já parece bem completo, talvez não precise de muita formatação
        // Mas se precisar, você pode usar um 'map' aqui para adaptar ao seu modelo do frontend.
        catchError(
          this.handleError<SolicitacaoComHistoricoDTO | null>(
            "fetchDetalhesSolicitacao",
            null
          )
        )
      );
  }

  // endpoint cliente
  fetchSolicitacoesPorClienteId(clienteId: string): Observable<Solicitacao[]> {
    if (!clienteId) {
      console.error(
        "SolicitacaoService: clienteId não fornecido para fetchSolicitacoesPorClienteId."
      );
      this.solicitacoesClienteSource.next([]);
      return of([]);
    }

    console.log(
      `SolicitacaoService: Buscando solicitações para clienteId: ${clienteId}`
    );

    return this.http
      .get<any[]>(`${this.apiUrl}/solicitacao/buscarCliente/${clienteId}`)
      .pipe(
        map((solicitacoesRecebidas) =>
          this.mapListaDoBackend(solicitacoesRecebidas)
        ),
        tap((solicitacoesFormatadas) => {
          this.solicitacoesClienteSource.next(solicitacoesFormatadas);
          console.log(
            "SolicitacaoService (cliente): Solicitações recebidas e processadas:",
            solicitacoesFormatadas
          );
        }),
        catchError(
          this.handleError<Solicitacao[]>(
            "fetchSolicitacoesPorClienteId",
            [],
            this.solicitacoesClienteSource
          )
        )
      );
  }

  // endpoint funcionario
  fetchSolicitacoesDashboard(funcionarioId: string): Observable<Solicitacao[]> {
    if (!funcionarioId) {
      console.error("SolicitacaoService: funcionarioId não fornecido.");
      this.solicitacoesFuncionarioSource.next([]);
      return of([]);
    }
    console.log(
      `SolicitacaoService: Buscando solicitações (abertas/alocadas) para funcionarioId: ${funcionarioId}`
    );
    return this.http
      .get<SolicitacaoFuncionarioBackendDTO[]>(
        `${this.apiUrl}/solicitacao/funcionario/${funcionarioId}`
      )
      .pipe(
        map((dtosRecebidos) => this.mapListaDoBackend(dtosRecebidos)),
        tap((solicitacoesFormatadas) => {
          this.solicitacoesFuncionarioSource.next(solicitacoesFormatadas);
          console.log(
            "SolicitacaoService (Dashboard Funcionario): Solicitações recebidas e processadas:",
            solicitacoesFormatadas
          );
        }),
        catchError(
          this.handleError<Solicitacao[]>(
            "fetchSolicitacoesDashboard",
            [],
            this.solicitacoesFuncionarioSource
          )
        )
      );
  }

  // Helper para transformar os dados do backend (DTOs diversos) para o modelo Solicitacao do Frontend
  private mapListaDoBackend(solicitacoesOuDTOs: any[]): Solicitacao[] {
    if (!Array.isArray(solicitacoesOuDTOs)) {
      console.warn("mapListaDoBackend: dados inválidos", solicitacoesOuDTOs);
      return [];
    }

    return solicitacoesOuDTOs.map((sBackend) => {
      const dataHora = sBackend.dataHora || sBackend.data_hora || sBackend.data;
      let dataFormatada = "";
      let horaFormatada = "";

      if (typeof dataHora === "string") {
        const date = new Date(dataHora);
        if (!isNaN(date.getTime())) {
          dataFormatada = date.toISOString().split("T")[0];
          horaFormatada = date.toTimeString().split(" ")[0].substring(0, 5);
        } else {
          console.warn(`Data inválida: ${dataHora}`);
        }
      }

      return {
        id: String(sBackend.id),
        numeroOs: sBackend.numeroOs,
        data: dataFormatada,
        hora: horaFormatada,
        equipamento:
          sBackend.descricaoEquipamento ||
          sBackend.descricao_equipamento ||
          "N/A",
        categoria:
          sBackend.fkCategoriaEquipamento ||
          sBackend.categoriaEquipamento ||
          "N/A",
        defeito:
          sBackend.descricaoDefeito || sBackend.descricao_defeito || "N/A",
        estado: String(sBackend.fkEstado || sBackend.estado || ""),
        orcamento:
          sBackend.orcamento !== undefined
            ? parseFloat(sBackend.orcamento)
            : undefined,
        idCliente: String(sBackend.fkCliente || sBackend.idCliente || ""),
        fk_funcionario: sBackend.fk_funcionario
          ? String(sBackend.fk_funcionario)
          : null,
        cliente: sBackend.nomeCliente || undefined,
        redirecionadoPara: sBackend.redirecionadoPara || null,
      };
    });
  }

  private handleError<T>(
    operation = "operation",
    result?: T,
    subjectToUpdate?: BehaviorSubject<any>
  ) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(
        `SolicitacaoService: ${operation} falhou com status ${error.status}, mensagem: ${error.message}`,
        error.error
      );
      if (subjectToUpdate) {
        subjectToUpdate.next(result !== undefined ? result : []);
      } else {
        // Fallback se nenhum subject específico for passado
        this.solicitacoesClienteSource.next(
          result !== undefined ? (result as Solicitacao[]) : []
        );
        this.solicitacoesFuncionarioSource.next(
          result !== undefined ? (result as Solicitacao[]) : []
        );
      }
      return of(result as T);
    };
  }

  adicionarSolicitacao(payload: criacaoPayload): Observable<RespostaApi> {
    return this.http
      .post<RespostaApi>(`${this.apiUrl}/solicitacao/criar`, payload)
      .pipe(
        tap(() => this.fetchSolicitacoesPorClienteId(payload.idCliente)),
        catchError((error) => {
          console.error("Erro ao adicionar solicitação:", error);
          return throwError(() => error);
        })
      );
  }

  atualizarSolicitacao(id: string, novoEstado: string): Observable<any> {
    console.warn(
      "SolicitacaoService: atualizarSolicitacao ainda usa mock local. Implementar PUT/PATCH."
    );
    const solicitacoesAtuais = this.solicitacoesFuncionarioSource.getValue();
    const index = solicitacoesAtuais.findIndex((s) => s.id === id);
    if (index !== -1) {
      solicitacoesAtuais[index] = {
        ...solicitacoesAtuais[index],
        estado: novoEstado,
      };
      this.solicitacoesFuncionarioSource.next(solicitacoesAtuais);
      return of({ success: true });
    }
    return throwError(
      () => new Error(`Mock: Solicitação com ID ${id} não encontrada.`)
    );
  }

  enviarOrcamento(dadosOrcamento: OrcamentoDTO): Observable<RespostaApi> {
    console.log(
      "SolicitacaoService: Enviando orçamento para o backend:",
      dadosOrcamento
    );
    return this.http
      .post<RespostaApi>(
        `${this.apiUrl}/solicitacao/atualizarEstado/orcado`,
        dadosOrcamento
      )
      .pipe(
        tap((response) => {
          console.log("Resposta do backend (Orçamento):", response);
        }),
        catchError(this.handleError<RespostaApi>("submeterOrcamento"))
      );
  }

  efetuarManutencao(
    dadosManutencao: EfetuarManutencaoDTO
  ): Observable<RespostaApi> {
    console.log(
      "SolicitacaoService: Enviando dados da manutenção:",
      dadosManutencao
    );
    const endpoint = `${this.apiUrl}/solicitacao/atualizarEstado/arrumada`;
    return this.http.post<RespostaApi>(endpoint, dadosManutencao).pipe(
      tap((response) =>
        console.log("Resposta do backend (Manutenção Efetuada):", response)
      ),
      catchError(this.handleError<RespostaApi>("efetuarManutencao"))
    );
  }

  redirecionarSolicitacao(
    dados: RedirecionarSolicitacaoDTO
  ): Observable<RespostaApi> {
    console.log(
      "SolicitacaoService: Enviando dados de redirecionamento:",
      dados
    );
    return this.http
      .post<RespostaApi>(
        `${this.apiUrl}/solicitacao/redirecionarSolicitacao`,
        dados
      )
      .pipe(
        tap((response) =>
          console.log("Resposta do backend (Redirecionamento):", response)
        ),
        catchError(this.handleError<RespostaApi>("redirecionarSolicitacao"))
      );
  }

  finalizarSolicitacao(solicitacaoId: string): Observable<RespostaApi> {
    const dto: MudarEstadoDTO = { idSolicitacao: solicitacaoId };

    console.log(
      `SolicitacaoService: Marcando OS ${solicitacaoId} como FINALIZADA.`
    );

    return this.http
      .post<RespostaApi>(
        `${this.apiUrl}/solicitacao/atualizarEstado/finalizada`,
        dto
      )
      .pipe(
        tap((response) => {
          console.log("Resposta do backend (Finalizada):", response);
        }),
        catchError(this.handleError<RespostaApi>("marcarComoFinalizada"))
      );
  }

  aprovarSolicitacao(payload: {
    id: string;
    motivo: string;
  }): Observable<RespostaApi> {
    console.log("Aprovando solicitação:", payload);
    return this.http
      .post<RespostaApi>(
        `${this.apiUrl}/solicitacao/atualizarEstado/aprovar`,
        payload,
        { responseType: "text" as "json" }
      )
      .pipe(
        tap((res) => console.log("Resposta da aprovação:", res)),
        catchError(this.handleError<RespostaApi>("aprovarSolicitacao"))
      );
  }

  rejeitarSolicitacao(payload: {
    id: string;
    motivo: string;
  }): Observable<RespostaApi> {
    console.log("Rejeitando solicitação:", payload);
    return this.http
      .post<RespostaApi>(
        `${this.apiUrl}/solicitacao/atualizarEstado/rejeitar`,
        payload,
        { responseType: "text" as "json" }
      )
      .pipe(
        tap((res) => console.log("Resposta da rejeição:", res)),
        catchError(this.handleError<RespostaApi>("rejeitarSolicitacao"))
      );
  }

  getSolicitacoes(): Solicitacao[] {
    return this.solicitacoesFuncionarioSource.getValue();
  }

  getSolicitacaoById(id: string): Solicitacao | undefined {
    return this.solicitacoesFuncionarioSource
      .getValue()
      .find((s) => s.id === id);
  }
}
