import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {
  private funcionariosSource = new BehaviorSubject<Funcionario[]>([]);
  funcionarios$ = this.funcionariosSource.asObservable();

  constructor() {}

  adicionarFuncionario(funcionario: Omit<Funcionario, 'id'>) {
    const funcionariosAtuais = this.funcionariosSource.value;
    const novaFuncionario: Funcionario = {
      ...funcionario,
      id: funcionariosAtuais.length + 1,
    };

    this.funcionariosSource.next([...funcionariosAtuais, novaFuncionario]);
  }

  atualizarFuncionario(id: number, nome: string, email: string): Observable<any> {
    const funcionariosAtuais = [...this.funcionariosSource.value];
    const index = funcionariosAtuais.findIndex(f => f.id === id);
  
    if (index !== -1) {
      const funcionario = funcionariosAtuais[index];
      
      funcionariosAtuais[index] = {
        ...funcionario,
        usuario: {
          ...funcionario.usuario,
          nome,
          email,
        },
      };
  
      this.funcionariosSource.next(funcionariosAtuais);
      return of({ success: true });
    }
  
    return throwError(() => new Error('Funcionário não encontrado'));
  }
  

  getFuncionarios() {
    return this.funcionariosSource.value;
  }

  getFuncionarioById(id: number): any {
    return this.funcionariosSource.value.find(s => s.id === id);
  }
}