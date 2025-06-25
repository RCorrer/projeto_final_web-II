import { Injectable } from "@angular/core";
import {
  RelatorioPorCategoria,
  RelatorioPorDia,
} from "../../models/relatorio.model";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RelatorioService {
  private baseUrl = `${environment.apiURL}/relatorio`;

  constructor(private http: HttpClient) {}

  getRelatorioPorCategoria(): Observable<RelatorioPorCategoria[]> {
    return this.http.get<RelatorioPorCategoria[]>(
      `${this.baseUrl}/receitasCategoria`
    );
  }

  getRelatorioPorPeriodo(
    dataInicial?: string,
    dataFinal?: string,
    categoria?: string
  ): Observable<RelatorioPorDia[]> {
    let params = new HttpParams();

    params = params.set("dataInicio", dataInicial || "");
    params = params.set("dataFim", dataFinal || "");

    if (categoria) {
      params = params.set("categoria", categoria);
    }

    return this.http.get<RelatorioPorDia[]>(`${this.baseUrl}/receitasPadrao`, {
      params,
    });
  }
}
