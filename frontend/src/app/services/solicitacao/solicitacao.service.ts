import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "../../../environments/environment";
import { ModalErroComponent } from "../../modals/modal-erro/modal-erro.component";

import { Solicitacao } from "../../models/Solicitacao.model";
import { SolicitacaoFuncionarioBackendDTO } from "../../models/SolicitacaoFuncionarioBackendDTO.model";
import {
  EfetuarManutencaoDTO,
  MudarEstadoDTO,
  OrcamentoDTO,
  RedirecionarSolicitacaoDTO,
  SolicitacaoComHistoricoDTO
} from "../../models/solicitacao-dto.model";
import { RespostaApi } from "../../models/respostaApi.model";

interface criacaoPayload {
  idCliente: string;
  descEquip: string;
  categoria: string;
  descDefeito: string;
}

@Injectable({ providedIn: "root" })
export class SolicitacaoService {
  private apiUrl = `${environment.apiURL}/solicitacao`;
  private apiUrlAtualizar = `${this.apiUrl}/atualizarEstado`;

  private solicitacoesClienteSource = new BehaviorSubject<Solicitacao[]>([]);
  solicitacoesCliente$ = this.solicitacoesClienteSource.asObservable();

  private solicitacoesFuncionarioSource = new BehaviorSubject<Solicitacao[]>([]);
  solicitacoesFuncionario$ = this.solicitacoesFuncionarioSource.asObservable();

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  fetchDetalhesSolicitacao(id: string): Observable<SolicitacaoComHistoricoDTO | null> {
    return this.http.get<SolicitacaoComHistoricoDTO>(`${this.apiUrl}/detalhes/${id}`).pipe(
      catchError(this.handleError<SolicitacaoComHistoricoDTO | null>("Detalhar Solicitação", null))
    );
  }

  fetchSolicitacoesPorClienteId(clienteId: string): Observable<Solicitacao[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscarCliente/${clienteId}`).pipe(
      map(this.mapListaDoBackend),
      tap(lista => this.solicitacoesClienteSource.next(lista)),
      catchError(this.handleError<Solicitacao[]>("Listar Solicitações Cliente", []))
    );
  }

  fetchSolicitacoesDashboard(funcionarioId: string): Observable<Solicitacao[]> {
    return this.http.get<SolicitacaoFuncionarioBackendDTO[]>(`${this.apiUrl}/funcionario/${funcionarioId}`).pipe(
      map(this.mapListaDoBackend),
      tap(lista => this.solicitacoesFuncionarioSource.next(lista)),
      catchError(this.handleError<Solicitacao[]>("Listar Solicitações Funcionário", []))
    );
  }

  adicionarSolicitacao(payload: criacaoPayload): Observable<RespostaApi> {
    return this.http.post<RespostaApi>(`${this.apiUrl}/criar`, payload).pipe(
      tap(() => this.fetchSolicitacoesPorClienteId(payload.idCliente).subscribe()),
      catchError(this.handleError<RespostaApi>("Adicionar Solicitação"))
    );
  }

  enviarOrcamento(dto: OrcamentoDTO): Observable<RespostaApi> {
    return this.http.post<RespostaApi>(`${this.apiUrlAtualizar}/orcado`, dto).pipe(
      catchError(this.handleError<RespostaApi>("Enviar Orçamento"))
    );
  }

  efetuarManutencao(dto: EfetuarManutencaoDTO): Observable<RespostaApi> {
    return this.http.post<RespostaApi>(`${this.apiUrlAtualizar}/arrumada`, dto).pipe(
      catchError(this.handleError<RespostaApi>("Efetuar Manutenção"))
    );
  }

  redirecionarSolicitacao(dto: RedirecionarSolicitacaoDTO): Observable<RespostaApi> {
    return this.http.post<RespostaApi>(`${this.apiUrl}/redirecionarSolicitacao`, dto).pipe(
      catchError(this.handleError<RespostaApi>("Redirecionar Solicitação"))
    );
  }

  finalizarSolicitacao(solicitacaoId: string): Observable<RespostaApi> {
    return this.http.post<RespostaApi>(`${this.apiUrlAtualizar}/finalizada`, { idSolicitacao: solicitacaoId }).pipe(
      catchError(this.handleError<RespostaApi>("Finalizar Solicitação"))
    );
  }

  aprovarSolicitacao(payload: { id: string; motivo: string }): Observable<RespostaApi> {
    return this.http.post<RespostaApi>(`${this.apiUrlAtualizar}/aprovar`, payload, {
      responseType: "text" as "json",
    }).pipe(
      catchError(this.handleError<RespostaApi>("Aprovar Solicitação"))
    );
  }

  rejeitarSolicitacao(payload: { id: string; motivo: string }): Observable<RespostaApi> {
    return this.http.post<RespostaApi>(`${this.apiUrlAtualizar}/rejeitar`, payload, {
      responseType: "text" as "json",
    }).pipe(
      catchError(this.handleError<RespostaApi>("Rejeitar Solicitação"))
    );
  }

  pagarSolicitacao(solicitacaoId: string): Observable<RespostaApi> {
    return this.http.post<RespostaApi>(`${this.apiUrlAtualizar}/paga`, { idSolicitacao: solicitacaoId }).pipe(
      catchError(this.handleError<RespostaApi>("Pagar Solicitação"))
    );
  }

  private mapListaDoBackend(lista: any[]): Solicitacao[] {
    return Array.isArray(lista) ? lista.map((s) => {
      const dataHoraOriginal = new Date(s.dataHora || s.data || s.data_hora);
      const data = new Date(dataHoraOriginal);
      data.setHours(data.getHours() + 3);
      return {
        id: String(s.id),
        numeroOs: s.numeroOs,
        data: data.toISOString().split("T")[0],
        hora: data.toTimeString().substring(0, 5),
        equipamento: s.descricaoEquipamento || s.descricao_equipamento || "N/A",
        categoria: s.fkCategoriaEquipamento || s.categoriaEquipamento || "N/A",
        defeito: s.descricaoDefeito || s.descricao_defeito || "N/A",
        estado: String(s.fkEstado || s.estado || ""),
        orcamento: s.orcamento !== undefined ? parseFloat(s.orcamento) : undefined,
        idCliente: String(s.fkCliente || s.idCliente || ""),
        fk_funcionario: s.fk_funcionario ? String(s.fk_funcionario) : null,
        cliente: s.nomeCliente || undefined,
        redirecionadoPara: s.redirecionadoPara || null,
      };
    }) : [];
  }

  private handleError<T>(contexto: string, result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      const mensagem =
        error?.error?.mensagem ||
        `${contexto} falhou. Verifique os dados e tente novamente.`;
      this.dialog.open(ModalErroComponent, { data: { mensagem } });
      console.error(`${contexto} - Erro:`, error);
      return of(result as T);
    };
  }

  getSolicitacoes(): Solicitacao[] {
    return this.solicitacoesFuncionarioSource.getValue();
  }

  getSolicitacaoById(id: string): Solicitacao | undefined {
    return this.getSolicitacoes().find(s => s.id === id);
  }
}
