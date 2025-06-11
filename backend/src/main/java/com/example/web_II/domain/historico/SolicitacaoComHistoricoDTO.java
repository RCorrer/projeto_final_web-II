package com.example.web_II.domain.historico;

import com.example.web_II.domain.cliente.Cliente;
import com.example.web_II.domain.cliente.EnviarClienteDTO;

import java.time.LocalDateTime;
import java.util.List;

public record SolicitacaoComHistoricoDTO(
        String id,
        Integer numeroOs,  // Novo campo
        String descricaoEquipamento,
        String categoriaEquipamento,
        String descricaoDefeito,
        String estado,
        String funcionarioNome,
        EnviarClienteDTO cliente,
        Float orcamento,
        LocalDateTime dataHora,
        List<HistoricoAlteracaoDTO> historico
) {}
