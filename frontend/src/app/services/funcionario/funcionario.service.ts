import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { Funcionario } from "../../models/funcionario.model";
import { tap, catchError } from "rxjs/operators";

interface funcionarioPayload {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;
}

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
    this.http
      .get<Funcionario[]>(`${this.apiUrl}/funcionarios`)
      .pipe(
        tap((response) => console.log("Funcionários carregados:", response))
      )
      .subscribe({
        next: (funcionarios) => this.funcionariosSource.next(funcionarios),
        error: (err) => console.error("Erro ao carregar funcionários:", err),
      });
  }

  adicionarFuncionario(payload: funcionarioPayload): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/cadastro/funcionario`, payload, {
        responseType: "text",
      })
      .pipe(
        tap(() => this.carregarFuncionarios()),
        catchError((error) => {
          console.error("Erro ao adicionar funcionário:", error);
          return throwError(() => error);
        })
      );
  }

  atualizarFuncionario(
    id: string,
    dados: Partial<Funcionario>
  ): Observable<Funcionario> {
    const payload = {
      name: dados.nome,
      login: dados.email,
      password: dados.senha,
      dataNascimento: dados.nascimento,
      role: "FUNCIONARIO",
    };

    return this.http
      .put<Funcionario>(`${this.apiUrl}/funcionarios/`, payload)
      .pipe(tap(() => this.carregarFuncionarios()));
  }

  getFuncionario(): Funcionario[] {
    return this.funcionariosSource.value;
  }

  removerFuncionario(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/funcionarios/${id}`)
      .pipe(tap(() => this.carregarFuncionarios()));
  }

  getFuncionarios() {
    return this.funcionariosSource.value;
  }

  getFuncionarioById(id: string): Funcionario | undefined {
    return this.funcionariosSource.value.find((s) => s.id === id);
  }

  fetchAllFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/funcionarios`)
      .pipe(
        tap(funcionarios => console.log(`[FuncionarioService] Foram encontrados ${funcionarios.length} funcionários.`)),
        catchError(error => {
          console.error('[FuncionarioService] Erro ao buscar todos os funcionários:', error);
          return of([]);
        })
      );
  }

}

