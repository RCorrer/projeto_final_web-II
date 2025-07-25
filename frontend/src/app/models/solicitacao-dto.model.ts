// Interface para o DTO de Cliente, parte do SolicitacaoComHistoricoDTO
export interface EnviarClienteDTO {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  complemento: string;
  numero: string;
  bairro: string;
  localidade: string;
  uf: string;
}

// Interface para cada item do histórico
export interface HistoricoAlteracaoDTO {
  descricao: string;
  estadoAnterior: string;
  estadoNovo: string;
  dataHora: string;
  funcionarioRedirecionado?: string
}

// Interface principal, refletindo o back SolicitacaoComHistoricoDTO.java
export interface SolicitacaoComHistoricoDTO {
  id: string;
  numeroOs: number;
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  orientacoes_cliente: string;
  descricao_manutencao: string;
  estado: string;
  funcionarioNome: string;
  cliente: EnviarClienteDTO;
  orcamento: number;
  dataHora: string;
  historico: HistoricoAlteracaoDTO[];
  idFormatado?: string; 
}

// Interface que corresponde ao MudarEstadoDTO.java
export interface MudarEstadoDTO {
  idSolicitacao: string;
}

// Interface OrcamentoDTO.java
export interface OrcamentoDTO {
  id: string;
  ifFuncionario: string;
  valor: number;
}

// Interface EfetuarManutencaoDTO.java
export interface EfetuarManutencaoDTO {
  idSolicitacao: string;
  descricaoManutencao: string;
  orientacoesCliente: string;
}

// Interface RedirecionarSolicitacaoDTO.java
export interface RedirecionarSolicitacaoDTO {
  idSolicitacao: string;
  idFuncionarioOrigem: string;
  idFuncionarioDestino: string;
}