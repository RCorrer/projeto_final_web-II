import { Usuario } from "./usuario.model";

export interface Funcionario {
  id: string;
  name: string;
  login: string;
  dataNascimento: string;
  password?: string;
  role?: string;
}
