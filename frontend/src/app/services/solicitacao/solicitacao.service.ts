import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Solicitacao } from '../models/Solicitacao.model';

@Injectable({
  providedIn: 'root'
})

export class SolicitacaoService {
  private solicitacoesSource = new BehaviorSubject<Solicitacao[]>([]);
  solicitacoes$ = this.solicitacoesSource.asObservable();

  constructor() {}

  adicionarSolicitacao(solicitacao: Omit<Solicitacao, 'id' | 'data' | 'hora' | 'estado'>) {
    const solicitacoesAtuais = this.solicitacoesSource.value;
    const novaSolicitacao: Solicitacao = {
      ...solicitacao,
      id: solicitacoesAtuais.length + 1,
      data: new Date().toISOString(),
      hora: new Date().toTimeString(),
      estado: 'ABERTA'
    };

    this.solicitacoesSource.next([...solicitacoesAtuais, novaSolicitacao]);
  }

  atualizarSolicitacao(id: number, novoEstado: string): Observable<any> {
    const solicitacoesAtuais = [...this.solicitacoesSource.value];
    const index = solicitacoesAtuais.findIndex(s => s.id === id);
    
    if (index !== -1) {
        solicitacoesAtuais[index] = {
            ...solicitacoesAtuais[index],
            estado: novoEstado
        };
        this.solicitacoesSource.next(solicitacoesAtuais);
        return of({ success: true });
    }
    
    return throwError(() => new Error('Solicitação não encontrada'));
  }

  getSolicitacoes() {
    return this.solicitacoesSource.value;
  }

  getSolicitacaoById(id: number): any {
    return this.solicitacoesSource.value.find(s => s.id === id);
  }
}
