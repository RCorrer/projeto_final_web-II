package com.example.web_II.domain.solicitacoes;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SolicitacaoFuncionarioDTO {
    private String id;
    private String descricaoEquipamento;
    private String categoriaEquipamento;
    private String descricaoDefeito;
    private String estado;
    private LocalDateTime dataHora;
    private String idCliente;
    private Float orcamento;

    public SolicitacaoFuncionarioDTO(Solicitacao solicitacao) {
        this.id = solicitacao.getId();
        this.descricaoEquipamento = solicitacao.getDescricao_equipamento();
        this.categoriaEquipamento = solicitacao.getFk_categoria_equipamento();
        this.descricaoDefeito = solicitacao.getDescricao_defeito();
        this.estado = solicitacao.getFk_estado();
        this.dataHora = solicitacao.getData_hora();
        this.idCliente = solicitacao.getFkCliente();
        this.orcamento = solicitacao.getOrcamento();
    }
}