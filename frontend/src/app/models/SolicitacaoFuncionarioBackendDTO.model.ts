export interface SolicitacaoFuncionarioBackendDTO {
  id: string;
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  estado: string;
  dataHora: string;
  idCliente: string;
  orcamento?: number;
}