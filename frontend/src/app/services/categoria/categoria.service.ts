import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, catchError, retry } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";

import { environment } from "../../../environments/environment";
import { Categoria } from "../../models/categoria.model";
import { RespostaApi } from "../../models/respostaApi.model";
import { ModalErroComponent } from "../../modals/modal-erro/modal-erro.component";

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  private baseUrl = `${environment.apiURL}/categoria`;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  listarCategorias(): Observable<string[]> {
    return this.http
      .get<string[]>(this.baseUrl)
      .pipe(
        retry(2),
        catchError(this.handleError<string[]>("Listar Categorias", []))
      );
  }

  adicionarCategoria(
    categoria: Omit<Categoria, "id">
  ): Observable<RespostaApi> {
    return this.http
      .post<RespostaApi>(this.baseUrl, categoria)
      .pipe(catchError(this.handleError<RespostaApi>("Adicionar Categoria")));
  }

  removerCategoria(descricao: string): Observable<any> {
    const url = `${this.baseUrl}/${encodeURIComponent(descricao)}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError<any>("Remover Categoria")));
  }

  atualizarCategoria(
    descricaoAntiga: string,
    novaDescricao: string
  ): Observable<RespostaApi> {
    const url = `${this.baseUrl}/${encodeURIComponent(descricaoAntiga)}`;
    const payload = { descricao: novaDescricao };
    return this.http
      .put<RespostaApi>(url, payload)
      .pipe(catchError(this.handleError<RespostaApi>("Atualizar Categoria")));
  }

  private handleError<T>(contexto: string, result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      const mensagem =
        error?.error?.mensagem ||
        error?.message ||
        `${contexto} falhou. Tente novamente.`;
      this.dialog.open(ModalErroComponent, {
        data: { mensagem },
      });
      return of(result as T);
    };
  }
}
