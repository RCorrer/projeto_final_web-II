
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
import { EfetuarManutencaoDTO, MudarEstadoDTO, OrcamentoDTO, SolicitacaoComHistoricoDTO } from "../../models/solicitacao-dto.model";

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
    if (!solicitacoesOuDTOs || !Array.isArray(solicitacoesOuDTOs)) {
      console.warn(
        "mapListaDoBackend: dados recebidos não são um array ou são nulos/undefined",
        solicitacoesOuDTOs
      );
      return [];
    }
    return solicitacoesOuDTOs.map((sBackend) => {
      const dataHoraOriginal =
        sBackend.dataHora || sBackend.data_hora || sBackend.data;
      let dataFormatada = "";
      let horaFormatada = "";

      if (dataHoraOriginal && typeof dataHoraOriginal === "string") {
        const dateObj = new Date(dataHoraOriginal.replace(" ", "T"));
        if (!isNaN(dateObj.getTime())) {
          dataFormatada = dateObj.toISOString().split("T")[0];
          horaFormatada = dateObj.toTimeString().split(" ")[0].substring(0, 5);
        } else {
          console.warn(
            `Formato de data/hora não reconhecido: '${dataHoraOriginal}' para OS ID ${sBackend.id}`
          );
        }
      } else if (dataHoraOriginal instanceof Date) {
        const dateObj = dataHoraOriginal;
        dataFormatada = dateObj.toISOString().split("T")[0];
        horaFormatada = dateObj.toTimeString().split(" ")[0].substring(0, 5);
      }

      const solicitacaoFront: Solicitacao = {
        id: String(sBackend.id),
        numeroOs: sBackend.numeroOs,
        data: dataFormatada,
        hora: horaFormatada,
        equipamento:
          sBackend.descricaoEquipamento ||
          sBackend.descricao_equipamento ||
          "N/A",
        categoria:
          sBackend.categoriaEquipamento ||
          sBackend.fk_categoria_equipamento ||
          "N/A",
        defeito:
          sBackend.descricaoDefeito || sBackend.descricao_defeito || "N/A",
        estado: String(sBackend.estado || sBackend.fk_estado || ""),
        orcamento:
          sBackend.orcamento !== undefined
            ? parseFloat(sBackend.orcamento)
            : undefined,
        idCliente: String(sBackend.idCliente || sBackend.fkCliente || ""),
        fk_funcionario: sBackend.fk_funcionario
          ? String(sBackend.fk_funcionario)
          : null,
        cliente: sBackend.nomeCliente,
        redirecionadoPara: sBackend.redirecionadoPara || null,
      };
      return solicitacaoFront;
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

  adicionarSolicitacao(payload: criacaoPayload): Observable<string> {
    return this.http.post(`${this.apiUrl}/solicitacao/criar`, payload, {
      responseType: "text",
    })
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

  enviarOrcamento(dadosOrcamento: OrcamentoDTO): Observable<string> {
    console.log('SolicitacaoService: Enviando orçamento para o backend:', dadosOrcamento);
    return this.http.post<string>(`${this.apiUrl}/solicitacao/atualizarEstado/orcado`, dadosOrcamento, { responseType: 'text' as 'json' })
      .pipe(
        tap(response => {
          console.log('Resposta do backend (Orçamento):', response);
        }),
        catchError(this.handleError<string>('submeterOrcamento'))
      );
  }

  efetuarManutencao(dadosManutencao: EfetuarManutencaoDTO): Observable<string> {
    console.log('SolicitacaoService: Enviando dados da manutenção:', dadosManutencao);
    const endpoint = `${this.apiUrl}/solicitacao/atualizarEstado/arrumada`;
    return this.http.post(endpoint, dadosManutencao, { responseType: 'text' })
      .pipe(
        tap(response => console.log('Resposta do backend (Manutenção Efetuada):', response)),
        catchError(this.handleError<string>('efetuarManutencao'))
      );
  }

  finalizarSolicitacao(solicitacaoId: string): Observable<string> {
    const dto: MudarEstadoDTO = { idSolicitacao: solicitacaoId };
    
    console.log(`SolicitacaoService: Marcando OS ${solicitacaoId} como FINALIZADA.`);
    
    return this.http.post<string>(`${this.apiUrl}/solicitacao/atualizarEstado/finalizada`, dto, { responseType: 'text' as 'json' })
      .pipe(
        tap(response => {
          console.log('Resposta do backend (Finalizada):', response);
        }),
        catchError(this.handleError<string>('marcarComoFinalizada'))
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
