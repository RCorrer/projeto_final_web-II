package com.example.web_II.domain.solicitacoes;

import com.example.web_II.domain.funcionarios.Funcionario;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name = "SolicitacaoManutencao")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Getter
@Setter
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "numero_os", unique = true, updatable = false, insertable = false)
    private Integer numeroOs;

    @Column(name = "fk_cliente")
    @NotNull
    private String fkCliente;
    private String descricao_equipamento;

    @Column(name = "fk_categoria_equipamento")
    private String fkCategoriaEquipamento;

    private String descricao_defeito;
    private String fk_estado;

    @ManyToOne
    @JoinColumn(name = "fk_funcionario", referencedColumnName = "id")
    private Funcionario funcionario;

    private Float orcamento;
    private LocalDateTime data_hora;

    @OneToMany(mappedBy = "fkSolicitacao", fetch = FetchType.LAZY)
    private List<com.example.web_II.domain.historico.HistoricoAlteracao> historicoAlteracoes = new ArrayList<>();

    private String orientacoes_cliente;
    private String descricao_manutencao;

    public Solicitacao(String cliente, String descEquipamento, String idCategoria, String descricaoDefeito, String idSituacao) {
        this.fkCliente = cliente;
        this.descricao_equipamento = descEquipamento;
        this.fkCategoriaEquipamento = idCategoria;
        this.descricao_defeito = descricaoDefeito;
        this.fk_estado = idSituacao;
        this.data_hora = LocalDateTime.now();
    }

    public String getFk_funcionario() {
        return funcionario != null ? funcionario.getId() : null;
    }

}