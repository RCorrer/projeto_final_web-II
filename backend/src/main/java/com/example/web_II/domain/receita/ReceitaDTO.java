package com.example.web_II.domain.receita;

import java.time.LocalDateTime;

public record ReceitaDTO(double valor, LocalDateTime data_hora, String fk_solicitacao) {
}
