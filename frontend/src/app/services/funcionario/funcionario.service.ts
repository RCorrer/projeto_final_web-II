import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Funcionario } from "../../models/funcionario.model";
import { RespostaApi } from "../../models/respostaApi.model";
import { environment } from "../../../environments/environment";
import { MatDialog } from "@angular/material/dialog";
import { ModalErroComponent } from "../../modals/modal-erro/modal-erro.component";
import { Router } from "@angular/router";

interface FuncionarioPayload {
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

  private apiUrl = `${environment.apiURL}/funcionarios`;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.carregarFuncionarios();
  }

  private carregarFuncionarios() {
    this.http.get<Funcionario[]>(this.apiUrl).subscribe({
      next: (funcionarios) => {
        console.log("Funcionários carregados:", funcionarios);
        this.funcionariosSource.next(funcionarios);
      },
      error: (error) => {
        const mensagem =
          error?.error?.mensagem ||
          "Erro ao carregar os funcionários. Tente novamente mais tarde.";
        this.dialog.open(ModalErroComponent, {
          data: { mensagem },
        });
      },
    });
  }

  adicionarFuncionario(payload: FuncionarioPayload): Observable<RespostaApi> {
    return this.http
      .post<RespostaApi>(`${environment.apiURL}/cadastro/funcionario`, payload)
      .pipe(
        tap(() => this.carregarFuncionarios()),
        catchError((error) => {
          const mensagem =
            error?.error?.mensagem ||
            "Erro ao adicionar. Verifique os dados e tente novamente.";
          this.dialog.open(ModalErroComponent, {
            data: { mensagem },
          });
          return throwError(() => error);
        })
      );
  }

  atualizarFuncionario(
    id: string,
    dados: Partial<Funcionario>
  ): Observable<Funcionario> {
    const payload = {
      id: id,
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
      nascimento: dados.nascimento,
      role: "FUNCIONARIO",
    };

    return this.http.put<Funcionario>(`${this.apiUrl}`, payload).pipe(
      tap(() => this.carregarFuncionarios()),
      catchError((error) => {
        const mensagem =
          error?.error?.mensagem || "Erro ao atualizar o funcionário.";
        this.dialog.open(ModalErroComponent, { data: { mensagem } });
        return of();
      })
    );
  }

  removerFuncionario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.carregarFuncionarios()),
      catchError((error) => {
        const mensagem =
          error?.error?.mensagem || "Erro ao remover o funcionário.";
        this.dialog.open(ModalErroComponent, { data: { mensagem } });
        return of();
      })
    );
  }

  getFuncionarios(): Funcionario[] {
    return this.funcionariosSource.value;
  }

  getFuncionarioById(id: string): Funcionario | undefined {
    return this.funcionariosSource.value.find((f) => f.id === id);
  }

  fetchAllFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}`).pipe(
      catchError((error) => {
        console.error(
          "[FuncionarioService] Erro ao buscar todos os funcionários:",
          error
        );
        return of([]);
      })
    );
  }
}
