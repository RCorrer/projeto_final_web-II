package com.example.web_II.domain.receita;

public record RelatorioCategoriaDTO(
        String categoria,
        double receitaTotal,
        long quantidadeServicos
) {
    // Adicione um construtor explícito se necessário
    public RelatorioCategoriaDTO(String categoria, Double receitaTotal, Long quantidadeServicos) {
        this(categoria,
                receitaTotal != null ? receitaTotal : 0.0,
                quantidadeServicos != null ? quantidadeServicos : 0L);
    }
}