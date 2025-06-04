import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Solicitacao } from '../../models/Solicitacao.model';
import { SolicitacaoFuncionarioBackendDTO } from '../../models/SolicitacaoFuncionarioBackendDTO.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private apiUrl = 'http://localhost:8080';

  // Para a tela do CLIENTE
  private solicitacoesClienteSource = new BehaviorSubject<Solicitacao[]>([]);
  solicitacoesCliente$ = this.solicitacoesClienteSource.asObservable();

  // NOVO: Para a tela do FUNCIONÁRIO
  private solicitacoesFuncionarioSource = new BehaviorSubject<Solicitacao[]>([]);
  solicitacoesFuncionario$ = this.solicitacoesFuncionarioSource.asObservable();

  constructor(private http: HttpClient) {}

  // endpoint cliente
  fetchSolicitacoesPorClienteId(clienteId: string): Observable<Solicitacao[]> {
    if (!clienteId) {
      console.error('SolicitacaoService: clienteId não fornecido para fetchSolicitacoesPorClienteId.');
      this.solicitacoesClienteSource.next([]);
      return of([]);
    }
    console.log(`SolicitacaoService: Buscando solicitações para clienteId: ${clienteId}`);

    return this.http.get<any[]>(`${this.apiUrl}/solicitacao/buscarCliente/${clienteId}`) 
      .pipe(
        map(solicitacoesRecebidas => this.mapListaDoBackend(solicitacoesRecebidas)),
        tap(solicitacoesFormatadas => {
          this.solicitacoesClienteSource.next(solicitacoesFormatadas);
          console.log('SolicitacaoService (cliente): Solicitações recebidas e processadas:', solicitacoesFormatadas);
        }),
        catchError(this.handleError<Solicitacao[]>('fetchSolicitacoesPorClienteId', [], this.solicitacoesClienteSource))
      );
  }

  // endpoint funcionario
  fetchSolicitacoesDashboard(funcionarioId: string): Observable<Solicitacao[]> {
    if (!funcionarioId) {
      console.error('SolicitacaoService: funcionarioId não fornecido.');
      this.solicitacoesFuncionarioSource.next([]);
      return of([]);
    }
    console.log(`SolicitacaoService: Buscando solicitações (abertas/alocadas) para funcionarioId: ${funcionarioId}`);
    return this.http.get<SolicitacaoFuncionarioBackendDTO[]>(`${this.apiUrl}/solicitacao/funcionario/${funcionarioId}`)
      .pipe(
        map(dtosRecebidos => this.mapListaDoBackend(dtosRecebidos)),
        tap(solicitacoesFormatadas => {
          this.solicitacoesFuncionarioSource.next(solicitacoesFormatadas);
          console.log('SolicitacaoService (Dashboard Funcionario): Solicitações recebidas e processadas:', solicitacoesFormatadas);
        }),
        catchError(this.handleError<Solicitacao[]>('fetchSolicitacoesDashboard', [], this.solicitacoesFuncionarioSource))
      );
  }

  // Helper para transformar os dados do backend (DTOs diversos) para o modelo Solicitacao do Frontend
  private mapListaDoBackend(solicitacoesOuDTOs: any[]): Solicitacao[] {
    if (!solicitacoesOuDTOs || !Array.isArray(solicitacoesOuDTOs)) {
      console.warn('mapListaDoBackend: dados recebidos não são um array ou são nulos/undefined', solicitacoesOuDTOs);
      return [];
    }
    return solicitacoesOuDTOs.map(sBackend => {
      const dataHoraOriginal = sBackend.dataHora || sBackend.data_hora || sBackend.data;
      let dataFormatada = '';
      let horaFormatada = '';

      if (dataHoraOriginal && typeof dataHoraOriginal === 'string') {
        const dateObj = new Date(dataHoraOriginal.replace(" ", "T"));
        if (!isNaN(dateObj.getTime())) {
          dataFormatada = dateObj.toISOString().split('T')[0];
          horaFormatada = dateObj.toTimeString().split(' ')[0].substring(0, 5);
        } else {
          console.warn(`Formato de data/hora não reconhecido: '${dataHoraOriginal}' para OS ID ${sBackend.id}`);
        }
      } else if (dataHoraOriginal instanceof Date) {
        const dateObj = dataHoraOriginal;
        dataFormatada = dateObj.toISOString().split('T')[0];
        horaFormatada = dateObj.toTimeString().split(' ')[0].substring(0,5);
      }

      const solicitacaoFront: Solicitacao = {
        id: String(sBackend.id),
        data: dataFormatada,
        hora: horaFormatada,
        equipamento: sBackend.descricaoEquipamento || sBackend.descricao_equipamento || 'N/A',
        categoria: sBackend.categoriaEquipamento || sBackend.fk_categoria_equipamento || 'N/A',
        defeito: sBackend.descricaoDefeito || sBackend.descricao_defeito || 'N/A',
        estado: String(sBackend.estado || sBackend.fk_estado || ''),
        orcamento: sBackend.orcamento !== undefined ? parseFloat(sBackend.orcamento) : undefined,
        idCliente: String(sBackend.idCliente || sBackend.fkCliente || ''),
        fk_funcionario: sBackend.fk_funcionario ? String(sBackend.fk_funcionario) : null,
        // cliente (nome) precisaria ser buscado ou vir no DTO se necessário para exibição direta
        redirecionadoPara: sBackend.redirecionadoPara || null,
      };
      return solicitacaoFront;
    });
  }

  private handleError<T>(operation = 'operation', result?: T, subjectToUpdate?: BehaviorSubject<any>) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`SolicitacaoService: ${operation} falhou com status ${error.status}, mensagem: ${error.message}`, error.error);
      if (subjectToUpdate) {
        subjectToUpdate.next(result !== undefined ? result : []);
      } else {
        // Fallback se nenhum subject específico for passado
        this.solicitacoesClienteSource.next(result !== undefined ? result as Solicitacao[] : []);
        this.solicitacoesFuncionarioSource.next(result !== undefined ? result as Solicitacao[] : []);
      }
      return of(result as T);
    };
  }

  // --- MÉTODOS DE MOCK (A SEREM SUBSTITUÍDOS POR CHAMADAS HTTP REAIS) ---
  adicionarSolicitacao(solicitacaoInput: Omit<Solicitacao, 'id' | 'data' | 'hora' | 'estado'>): Observable<Solicitacao> {
    console.warn("SolicitacaoService: adicionarSolicitacao ainda usa mock local. Implementar POST.");
    const solicitacoesAtuais = this.solicitacoesFuncionarioSource.getValue(); // Exemplo, use o source apropriado
    const novaSolicitacao: Solicitacao = {
      id: `mock-${Math.random().toString(36).substring(2, 9)}`,
      data: new Date().toISOString().split('T')[0],
      hora: new Date().toTimeString().split(' ')[0].substring(0, 5),
      estado: 'ABERTA',
      cliente: (solicitacaoInput as any).cliente || 'Cliente Mock',
      equipamento: (solicitacaoInput as any).equipamento || 'Equipamento Mock',
      categoria: (solicitacaoInput as any).categoria || 'Categoria Mock',
      defeito: (solicitacaoInput as any).defeito || 'Defeito Mock',
    };
    this.solicitacoesFuncionarioSource.next([...solicitacoesAtuais, novaSolicitacao]);
    return of(novaSolicitacao);
  }

  atualizarSolicitacao(id: string, novoEstado: string): Observable<any> {
    console.warn("SolicitacaoService: atualizarSolicitacao ainda usa mock local. Implementar PUT/PATCH.");
    const solicitacoesAtuais = this.solicitacoesFuncionarioSource.getValue();
    const index = solicitacoesAtuais.findIndex(s => s.id === id);
    if (index !== -1) {
        solicitacoesAtuais[index] = { ...solicitacoesAtuais[index], estado: novoEstado };
        this.solicitacoesFuncionarioSource.next(solicitacoesAtuais);
        return of({ success: true });
    }
    return throwError(() => new Error(`Mock: Solicitação com ID ${id} não encontrada.`));
  }

  getSolicitacoes(): Solicitacao[] {
    return this.solicitacoesFuncionarioSource.getValue();
  }

  getSolicitacaoById(id: string): Solicitacao | undefined {
    return this.solicitacoesFuncionarioSource.getValue().find(s => s.id === id);
  }
}