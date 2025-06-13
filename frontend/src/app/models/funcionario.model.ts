import { Usuario } from "./usuario.model";

export interface Funcionario {
    id: number;
    dataNascimento: string;
    senha: string;
    usuario: Usuario;
}
