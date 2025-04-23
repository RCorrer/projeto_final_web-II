import { Injectable } from "@angular/core";
import { Equipamento } from "../models/equipamento.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// Injeção de dependência do serviço de equipamentos - cria uma única instância disponível em toda a aplicação
@Injectable({
  providedIn: "root",
})
export class EquipamentoService {
  private baseUrl = 'http://localhost:8080/categoria';
  constructor(private http: HttpClient) {}

  listarEquipamentos(): Observable<Equipamento[]> {
    return this.http.get<Equipamento[]>(`${this.baseUrl}/listar`);
  }

  adicionarEquipamento(descricao: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/adicionar`, { descricao }, { responseType: 'text' });
  }

  excluirEquipamento(descricao: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/excluir/${descricao}`, { responseType: 'text' });
  }

  private equipamentos: Equipamento[] = [
    { descricao: "Impressora" },
    { descricao: "Periférico" },
    { descricao: "Computador" },
    { descricao: "Monitor" },
    { descricao: "Rede" },
  ];

  getEquipamentos(): Equipamento[] {
    return this.equipamentos;
  }
}
