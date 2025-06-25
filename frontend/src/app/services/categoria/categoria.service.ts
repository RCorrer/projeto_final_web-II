import { Categoria } from "./../../models/categoria.model";
import { RespostaApi } from "../../models/respostaApi.model";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  throwError,
  of,
  tap,
  catchError,
  retry,
} from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ModalErroComponent } from "../../modals/modal-erro/modal-erro.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  private baseUrl = `${environment.apiURL}/categoria`;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    console.log(
      "CategoriaService: Construtor chamado. Base URL:",
      this.baseUrl
    );
  }

  listarCategorias(): Observable<string[]> {
    console.log(
      "CategoriaService: listarCategorias - Enviando GET para:",
      this.baseUrl
    );
    return this.http.get<string[]>(this.baseUrl).pipe(
      retry(2),
      tap((data) => {
        console.log(
          "CategoriaService: listarCategorias - Dados brutos recebidos:",
          data
        );
        if (!Array.isArray(data)) {
          console.warn(
            "CategoriaService: listarCategorias - Resposta da API não é um array:",
            data
          );
        } else if (data.length === 0) {
          console.warn(
            "CategoriaService: listarCategorias - Nenhuma categoria retornada pela API."
          );
        } else {
          console.log(
            `CategoriaService: listarCategorias - ${data.length} categorias recebidas.`
          );
        }
      })
    );
  }

  adicionarCategoria(
    categoria: Omit<Categoria, "id">
  ): Observable<RespostaApi> {
    const url = `${this.baseUrl}`;
    console.log(
      "CategoriaService: adicionarCategoria - Enviando POST para:",
      url,
      "Payload:",
      categoria
    );
    return this.http.post<RespostaApi>(url, categoria).pipe(
      tap((response) =>
        console.log(
          "CategoriaService: adicionarCategoria - Resposta:",
          response
        )
      ),
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

  private handleError<T>(operation = "operation", result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(
        `CategoriaService: ${operation} falhou. Status: ${error.status}. Mensagem: ${error.message}`,
        error
      );

      // Log mais detalhado do erro do backend
      if (error.error) {
        console.error(
          `CategoriaService: Detalhes do erro do backend:`,
          error.error
        );
      }
      return of(result as T);
    };
  }

  removerCategoria(descricao: string): Observable<any> {
    const url = `${this.baseUrl}/${encodeURIComponent(descricao)}`;
    console.log("CategoriaService: removerCategoria", url);
    return this.http.delete(url).pipe(
      tap((response) => {
        console.log(
          "CategoriaService: Resposta de sucesso ao remover.",
          response
        );
      }),
      catchError((error) => {
        const mensagem =
          error?.error?.mensagem ||
          "Erro ao remover. Verifique os dados e tente novamente.";
        this.dialog.open(ModalErroComponent, {
          data: { mensagem },
        });
        return throwError(() => error);
      })
    );
  }

  atualizarCategoria(
    descricaoAntiga: string,
    novaDescricao: string
  ): Observable<RespostaApi> {
    const url = `${this.baseUrl}/${encodeURIComponent(descricaoAntiga)}`;
    const payload = { descricao: novaDescricao };
    console.log(
      "CategoriaService: atualizarCategoria - Enviando PUT para:",
      url,
      "Payload:",
      payload
    );
    return this.http.put<RespostaApi>(url, payload).pipe(
      tap((response) =>
        console.log(
          "CategoriaService: atualizarCategoria - Resposta:",
          response
        )
      ),
      catchError((error) => {
        const mensagem =
          error?.error?.mensagem ||
          "Erro ao editar. Verifique os dados e tente novamente.";
        this.dialog.open(ModalErroComponent, {
          data: { mensagem },
        });
        return throwError(() => error);
      })
    );
  }
}
