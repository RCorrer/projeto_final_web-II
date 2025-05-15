package com.example.web_II.domain.historico;

import java.time.LocalDateTime;

public record HistoricoAlteracaoDTO(
        String descricao,
        String estadoAnterior,
        String estadoNovo,
        LocalDateTime dataHora
) {}
