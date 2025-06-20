package com.example.web_II.domain.solicitacoes;

import com.example.web_II.domain.cliente.Cliente;
import com.example.web_II.repositories.ClienteRepository;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Getter
@Setter
public class SolicitacaoFuncionarioDTO {
    private String id;
    private Integer numeroOs;  // Novo campo
    private String descricaoEquipamento;
    private String categoriaEquipamento;
    private String descricaoDefeito;
    private String orientacoes_cliente;
    private String descricao_manutencao;
    private String nomeCliente;
    private String estado;
    private LocalDateTime dataHora;
    private Float orcamento;


    public SolicitacaoFuncionarioDTO(Solicitacao solicitacao, Cliente cliente) {
        this.id = solicitacao.getId();
        this.numeroOs = solicitacao.getNumeroOs();
        this.descricaoEquipamento = solicitacao.getDescricao_equipamento();
        this.categoriaEquipamento = solicitacao.getFkCategoriaEquipamento();
        this.descricaoDefeito = solicitacao.getDescricao_defeito();
        this.orientacoes_cliente = solicitacao.getOrientacoes_cliente();
        this.descricao_manutencao = solicitacao.getDescricao_manutencao();
        this.estado = solicitacao.getFk_estado();
        this.dataHora = solicitacao.getData_hora();
        this.orcamento = solicitacao.getOrcamento();
        this.nomeCliente = cliente.getUsuario().getNome();
    }
}