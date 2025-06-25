export interface Funcionario {
  id: string;
  usuarioId: string;
  nome: string;
  email: string;
  nascimento: string;
  senha?: string;
  role?: string;
}
