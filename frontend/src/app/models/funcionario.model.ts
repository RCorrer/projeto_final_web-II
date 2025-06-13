import { Usuario } from "./usuario.model";

export interface Funcionario {
  id: string;
  nome: string;
  email: string;
  dataNascimento: string;
  senha?: string;
  role?: string;
}
