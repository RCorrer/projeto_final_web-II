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

// refazer futuramente (porém funciona)
export class CategoriaService {
  private baseUrl = `${environment.apiURL}/categoria`;

  constructor(private http: HttpClient) {
    console.log(
      "CategoriaService: Construtor chamado. Base URL:",
      this.baseUrl
    );
  }

  adicionarCategoria(categoria: Omit<Categoria, "id">): Observable<string> {
    const url = `${this.baseUrl}/adicionar`;
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

  listarCategorias(): Observable<Categoria[]> {
    const url = `${this.baseUrl}/listar`;
    console.log("CategoriaService: listarCategorias - Enviando GET para:", url);
    return this.http.get<Categoria[]>(url).pipe(
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
      }),
      catchError(this.handleError<Categoria[]>("listarCategorias", [])) // Retorna array vazio em caso de erro
    );
  }

  atualizarCategoria(
    descricaoAntiga: string,
    novaDescricao: string
  ): Observable<string> {
    // ID? Descrição antiga?
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
