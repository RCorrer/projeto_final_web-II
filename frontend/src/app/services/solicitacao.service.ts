import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Solicitacao {
  id: number;
  equipamento: string;
  categoria: string;
  defeito: string;
  dataHora: string;
  estado: string;
  cliente: string;
}

@Injectable({
  providedIn: 'root'
})

export class SolicitacaoService {
  private solicitacoesSource = new BehaviorSubject<Solicitacao[]>([]);
  solicitacoes$ = this.solicitacoesSource.asObservable();

  constructor() {}

  adicionarSolicitacao(solicitacao: Omit<Solicitacao, 'id' | 'dataHora' | 'estado'>) {
    const solicitacoesAtuais = this.solicitacoesSource.value;
    const novaSolicitacao: Solicitacao = {
      ...solicitacao,
      id: solicitacoesAtuais.length + 1,
      dataHora: new Date().toISOString(),
      estado: 'ABERTA'
    };

    this.solicitacoesSource.next([...solicitacoesAtuais, novaSolicitacao]);
  }

  atualizarSolicitacao(id: number, novoEstado: string) {
    const solicitacoesAtuais = this.solicitacoesSource.value;
    const solicitacaoIndex = solicitacoesAtuais.findIndex(s => s.id === id);

    if (solicitacaoIndex !== -1) {
      const solicitacoesAtualizadas = [...solicitacoesAtuais];
      solicitacoesAtualizadas[solicitacaoIndex] = {
        ...solicitacoesAtualizadas[solicitacaoIndex],
        estado: novoEstado
      };
      this.solicitacoesSource.next(solicitacoesAtualizadas);
    }
  }

  getSolicitacoes() {
    return this.solicitacoesSource.value;
  }
}
