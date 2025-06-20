package com.example.web_II.domain.solicitacoes;

import com.example.web_II.domain.historico.HistoricoAlteracaoSolicitacaoDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;

public record SolicitacaoClienteDTO(
        String id,
        Integer numeroOs,
        String fkCliente,
        String descricaoEquipamento,
        String fkCategoriaEquipamento,
        String descricaoDefeito,
        String orientacoes_cliente,
        String descricao_manutencao,
        String fkEstado,
        String funcionarioNome,
        Float orcamento,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        LocalDateTime dataHora,
        List<HistoricoAlteracaoSolicitacaoDTO> historicoAlteracoes
) {
    public static SolicitacaoClienteDTO fromEntity(Solicitacao solicitacao, String descricaoCategoria) {
        String funcionarioNome = solicitacao.getFuncionario() != null ?
                solicitacao.getFuncionario().getUsuario().getNome() : null;

        return new SolicitacaoClienteDTO(
                solicitacao.getId(),
                solicitacao.getNumeroOs(),
                solicitacao.getFkCliente(),
                solicitacao.getDescricao_equipamento(),
                descricaoCategoria,
                solicitacao.getDescricao_defeito(),
                solicitacao.getOrientacoes_cliente(),
                solicitacao.getDescricao_manutencao(),
                solicitacao.getFk_estado(),
                funcionarioNome,
                solicitacao.getOrcamento(),
                solicitacao.getData_hora(),
                solicitacao.getHistoricoAlteracoes().stream()
                        .map(HistoricoAlteracaoSolicitacaoDTO::fromEntity)
                        .toList()
        );
    }
}