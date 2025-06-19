import { Categoria } from "./../../models/categoria.model";
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

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  private baseUrl = `${environment.apiURL}/categoria`;

  constructor(private http: HttpClient) {
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

  adicionarCategoria(categoria: Omit<Categoria, "id">): Observable<string> {
    const url = `${this.baseUrl}`;
    console.log(
      "CategoriaService: adicionarCategoria - Enviando POST para:",
      url,
      "Payload:",
      categoria
    );
    return this.http.post(url, categoria, { responseType: "text" }).pipe(
      tap((response) =>
        console.log(
          "CategoriaService: adicionarCategoria - Resposta:",
          response
        )
      ),
      catchError(
        this.handleError<string>(
          `adicionarCategoria ${JSON.stringify(categoria)}`
        )
      )
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
      catchError(this.handleError<string>(`excluir categoria: `, descricao))
    );
  }

  atualizarCategoria(
    descricaoAntiga: string,
    novaDescricao: string
  ): Observable<string> {
    const url = `${this.baseUrl}/edita/${encodeURIComponent(descricaoAntiga)}`;
    const payload = { descricao: novaDescricao };
    console.log(
      "CategoriaService: atualizarCategoria - Enviando PUT para:",
      url,
      "Payload:",
      payload
    );
    return this.http.put(url, payload, { responseType: "text" }).pipe(
      tap((response) =>
        console.log(
          "CategoriaService: atualizarCategoria - Resposta:",
          response
        )
      ),
      catchError(
        this.handleError<string>(`atualizarCategoria ${descricaoAntiga}`)
      )
    );
  }
}
