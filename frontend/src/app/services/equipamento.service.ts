import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Equipamento } from '../models/equipamento.model';

@Injectable({
  providedIn: 'root',
})
export class EquipamentoService {
  private equipamentosSource = new BehaviorSubject<Equipamento[]>([]);
  equipamentos$ = this.equipamentosSource.asObservable();

  private idCounter = 1;

  adicionarEquipamento(equipamento: Omit<Equipamento, 'id'>) {
    const equipamentosAtuais = this.equipamentosSource.value;
    const novoEquipamento: Equipamento = {
      id: this.idCounter++,
      ...equipamento
    };
    this.equipamentosSource.next([...equipamentosAtuais, novoEquipamento]);
  }

  atualizarEquipamento(id: number, novaDescricao: string): Observable<any> {
    const equipamentosAtuais = [...this.equipamentosSource.value];
    const index = equipamentosAtuais.findIndex(f => f.id === id);

    if (index !== -1) {
      equipamentosAtuais[index] = {
        ...equipamentosAtuais[index],
        descricao: novaDescricao,
      };

      this.equipamentosSource.next(equipamentosAtuais);
      return of({ success: true });
    }

    return throwError(() => new Error('Equipamento não encontrado'));
  }

  removerEquipamento(id: number) {
    const equipamentosAtualizados = this.equipamentosSource.value.filter(e => e.id !== id);
    this.equipamentosSource.next(equipamentosAtualizados);
  }

  getEquipamentos(): Equipamento[] {
    return this.equipamentosSource.value;
  }
}