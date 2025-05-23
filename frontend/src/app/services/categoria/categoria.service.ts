import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError, of } from "rxjs";
import { Categoria } from "../models/categoria.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  private baseUrl = `${environment.apiURL}/categoria`;

  constructor(private http: HttpClient) {}

  adicionarCategoria(categoria: Categoria): Observable<string> {
    return this.http.post(`${this.baseUrl}/adicionar`, categoria, {
      responseType: "text",
    });
  }

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/listar`);
}

  // private equipamentosSource = new BehaviorSubject<Categoria[]>([]);
  // equipamentos$ = this.equipamentosSource.asObservable();

  // private idCounter = 1;

  // adicionarCategoria(equipamento: Omit<Categoria, "id">) {
  //   const equipamentosAtuais = this.equipamentosSource.value;
  //   const novoCategoria: Categoria = {
  //     id: this.idCounter++,
  //     ...equipamento,
  //   };
  //   this.equipamentosSource.next([...equipamentosAtuais, novoCategoria]);
  // }

atualizarCategoria(descricaoAntiga: string, novaDescricao: string): Observable<string> {
  return this.http.put(
    `${this.baseUrl}/edita/${descricaoAntiga}`,
    { descricao: novaDescricao },
    { responseType: 'text' }
  );
}



  // removerCategoria(id: number) {
  //   const equipamentosAtualizados = this.equipamentosSource.value.filter(
  //     (e) => e.id !== id
  //   );
  //   this.equipamentosSource.next(equipamentosAtualizados);
  // }

  // getCategorias(): Categoria[] {
  //   return this.equipamentosSource.value;
  // }
}
