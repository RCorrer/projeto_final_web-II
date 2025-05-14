package com.example.web_II.domain.solicitacoes;

public record RedirecionarSolicitacaoDTO(String idSolicitacao,
                                         String idFuncionarioOrigem,
                                         String idFuncionarioDestino) {
}
