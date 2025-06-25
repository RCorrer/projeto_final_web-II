package com.example.web_II.domain.historico;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public record HistoricoAlteracaoDTO(
        String descricao,
        String estadoAnterior,
        String estadoNovo,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        LocalDateTime dataHora,
        String funcionarioRedirecionado
) {}