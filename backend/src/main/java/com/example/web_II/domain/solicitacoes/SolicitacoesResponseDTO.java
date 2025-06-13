package com.example.web_II.domain.solicitacoes;

public record SolicitacoesResponseDTO(String id,
                                      String cliente,
                                      String data_hora,
                                      String descEquipamento,
                                      String categoriaEquip,
                                      String descricaoDefeito,
                                      String estadoSolicitacao,
                                      Float orcamento,
                                      String funcionario) {
}
