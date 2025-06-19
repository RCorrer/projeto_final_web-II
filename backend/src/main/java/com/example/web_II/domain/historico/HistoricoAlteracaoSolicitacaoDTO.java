package com.example.web_II.domain.historico;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public record HistoricoAlteracaoSolicitacaoDTO(
        String id,
        String fkSolicitacao,
        String descricao,
        String estadoAnterior,
        String estadoNovo,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        LocalDateTime dataHora
) {
    public static HistoricoAlteracaoSolicitacaoDTO fromEntity(HistoricoAlteracao historico) {
        return new HistoricoAlteracaoSolicitacaoDTO(
                historico.getId(),
                historico.getFkSolicitacao(),
                historico.getDescricao(),
                historico.getEstadoAnterior(),
                historico.getEstadoNovo(),
                historico.getDataHora()
        );
    }
}