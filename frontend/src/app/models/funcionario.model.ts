import { Usuario } from "./usuario.model";

export interface Funcionario {
    id: string;
    dataNascimento: string; // string porque o backend manda LocalDate como ISO string (ex: '2025-03-01')
    senha: string;
    usuario: Usuario;
}
