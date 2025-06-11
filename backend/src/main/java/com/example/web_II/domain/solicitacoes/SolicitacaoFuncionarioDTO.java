package com.example.web_II.domain.solicitacoes;

import com.example.web_II.domain.cliente.Cliente;
import com.example.web_II.repositories.ClienteRepository;
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
    private String estado;
    private LocalDateTime dataHora;
    private Float orcamento;
    private String nomeCliente;

    public SolicitacaoFuncionarioDTO(Solicitacao solicitacao, Cliente cliente) {
        this.id = solicitacao.getId();
        this.numeroOs = solicitacao.getNumeroOs();  // Novo campo
        this.descricaoEquipamento = solicitacao.getDescricao_equipamento();
        this.categoriaEquipamento = solicitacao.getFk_categoria_equipamento();
        this.descricaoDefeito = solicitacao.getDescricao_defeito();
        this.estado = solicitacao.getFk_estado();
        this.dataHora = solicitacao.getData_hora();
        this.orcamento = solicitacao.getOrcamento();
        this.nomeCliente = cliente.getUsuario().getNome();
    }
}