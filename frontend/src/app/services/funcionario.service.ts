import { Injectable } from "@angular/core";
import { Funcionario } from "../models/funcionario.model";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root", // já deixa o serviço injetável no app inteiro
})
export class FuncionarioService {
  // Array de funcionários fictícios
  private funcionariosMock: Funcionario[] = [
    {
      id: "1",
      dataNascimento: "1990-05-15",
      senha: "senha123",
      usuario: {
        id: "u1",
        nome: "Maria Souza",
        email: "maria@example.com",
      },
    },
    {
      id: "2",
      dataNascimento: "1985-12-22",
      senha: "senha123",
      usuario: {
        id: "u2",
        nome: "João Silva",
        email: "joao@example.com",
      },
    },
  ];

  // Simula um GET no backend
  listar(): Observable<Funcionario[]> {
    return of(this.funcionariosMock);
  }

  // Simula um DELETE
  excluir(id: string): Observable<void> {
    this.funcionariosMock = this.funcionariosMock.filter((f) => f.id !== id);
    return of(undefined);
  }

  // Simula um PUT ou POST
  salvar(func: Funcionario): Observable<Funcionario> {
    const existente = this.funcionariosMock.find((f) => f.id === func.id);
    if (existente) {
      Object.assign(existente, func);
    } else {
      this.funcionariosMock.push({ ...func, id: crypto.randomUUID() });
    }
    return of(func);
  }
}
