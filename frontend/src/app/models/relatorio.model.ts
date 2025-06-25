export interface RelatorioPorCategoria {
  categoria: string;
  receitaTotal: number;
  quantidadeServicos: number;
}

export interface RelatorioPorDia {
  dia: string; // Ex: "2025-06-16"
  receitaTotal: number;
}
