package com.example.web_II.domain.historico;

import java.time.LocalDateTime;
import java.util.List;

public record SolicitacaoComHistoricoDTO(
        String id,
        String cliente,
        String descricaoEquipamento,
        String categoriaEquipamento,
        String descricaoDefeito,
        String estado,
        String funcionarioNome,
        Float orcamento,
        LocalDateTime dataHora,
        List<HistoricoAlteracaoDTO> historico
) {}
