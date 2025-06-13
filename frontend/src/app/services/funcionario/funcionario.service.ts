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
        console.log("Resposta completa:", response);

        if (!response.content) {
          console.error("Estrutura inesperada:", response);
          return;
        }

        const funcionarios = response.content.map((item: any) => {
          const funcionario = this.mapToFuncionario(item);
          console.log("Funcionário mapeado:", funcionario);
          return funcionario;
        });

        this.funcionariosSource.next(funcionarios);
      },
      error: (err) => console.error("Erro ao carregar:", err),
    });
  }

  private mapToFuncionario(item: any): Funcionario {
    console.log("Item original do backend:", item); // Adicione este log

    if (!item.id) {
      console.error("Item sem ID:", item);
    }

    return {
      id: item.id, // Garanta que está pegando o ID correto
      dataNascimento: item.dataNascimento || item.nascimento || "",
      senha: "",
      usuario: {
        id: item.id, // Mesmo ID do funcionário
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

  removerFuncionario(id: string): Observable<any> {
    console.log("ID recebido para exclusão:", id); // Debug

    if (!id) {
      console.error("ID inválido recebido no serviço");
      return throwError(() => new Error("ID inválido"));
    }

    return this.http.delete(`${this.apiUrl}/funcionarios/${id}`).pipe(
      tap(() => {
        console.log("Exclusão bem sucedida, atualizando lista...");
        const funcionariosAtualizados = this.funcionariosSource.value.filter(
          (e) => e.id !== id
        );
        this.funcionariosSource.next(funcionariosAtualizados);
      }),
      catchError((error) => {
        console.error("Erro completo na exclusão:", error);
        this.carregarFuncionarios();
        return throwError(() => error);
      })
    );
  }

  getFuncionario(): Funcionario[] {
    return this.funcionariosSource.value;
  }

  atualizarFuncionario(
    id: string,
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

  getFuncionarioById(id: string): any {
    return this.funcionariosSource.value.find((s) => s.id === id);
  }
}
