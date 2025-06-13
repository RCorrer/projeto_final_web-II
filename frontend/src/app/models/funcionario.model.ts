import { Usuario } from "./usuario.model";

export interface Funcionario {
    id: string;
    dataNascimento: string;
    senha: string;
    usuario: Usuario;
}
