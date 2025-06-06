import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Funcionario } from "../../models/funcionario.model";
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FuncionarioService {
  private funcionariosSource = new BehaviorSubject<Funcionario[]>([]);
  funcionarios$ = this.funcionariosSource.asObservable();
  private apiUrl = "http://localhost:8080";

  constructor(private http: HttpClient) {
    this.carregarFuncionarios();
  }

  private carregarFuncionarios() {
    this.http.get<any>(`${this.apiUrl}/funcionarios`).subscribe({
      next: (response) => {
        const funcionarios = response.content.map((item: any) =>
          this.mapToFuncionario(item)
        );
        this.funcionariosSource.next(funcionarios);
      },
      error: (err) => console.error("Erro ao carregar funcionários", err),
    });
  }

  private mapToFuncionario(item: any): Funcionario {
    return {
      id: item.id || 0,
      dataNascimento: item.nascimento || item.dataNascimento || "",
      senha: "",
      usuario: {
        id: (item.id || 0).toString(),
        nome: item.nome || item.usuario?.nome || "",
        email: item.email || item.usuario?.email || "",
      },
    };
  }

  adicionarFuncionario(funcionario: Omit<Funcionario, "id">): Observable<any> {
    const payload = {
      name: funcionario.usuario.nome,
      login: funcionario.usuario.email,
      password: funcionario.senha,
      dataNascimento: funcionario.dataNascimento,
    };

    return this.http
      .post(`${this.apiUrl}/cadastro/funcionario`, payload, {
        responseType: "text",
      })
      .pipe(tap(() => this.carregarFuncionarios()));
  }

  removerFuncionario(id: number): Observable<any> {
    console.log("ID recebido no service:", id, "Tipo:", typeof id);

    if (!id || id === 0) {
      console.error("ID inválido para exclusão");
      return throwError(() => new Error("ID inválido"));
    }

    return this.http.delete(`${this.apiUrl}/funcionarios/${id}`).pipe(
      tap(() => {
        console.log("Lista antes da exclusão:", this.funcionariosSource.value);
        const funcionariosAtualizados = this.funcionariosSource.value.filter(
          (e) => e.id !== id
        );
        console.log("Lista após exclusão:", funcionariosAtualizados);
        this.funcionariosSource.next(funcionariosAtualizados);
      }),
      catchError((error) => {
        console.error("Erro completo:", error);
        this.carregarFuncionarios();
        return throwError(() => error);
      })
    );
  }

  getFuncionario(): Funcionario[] {
    return this.funcionariosSource.value;
  }

  atualizarFuncionario(
    id: number,
    dadosAtualizados: {
      nome: string;
      email: string;
      senha: string;
      dataNascimento: string;
    }
  ): Observable<any> {
    const payload = {
      name: dadosAtualizados.nome,
      login: dadosAtualizados.email,
      password: dadosAtualizados.senha,
      dataNascimento: dadosAtualizados.dataNascimento,
    };

    return this.http
      .put(`${this.apiUrl}/${id}`, payload)
      .pipe(tap(() => this.carregarFuncionarios()));
  }

  getFuncionarios() {
    return this.funcionariosSource.value;
  }

  getFuncionarioById(id: number): any {
    return this.funcionariosSource.value.find((s) => s.id === id);
  }
}
