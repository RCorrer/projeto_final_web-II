package com.example.web_II.domain.solicitacoes;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Table (name = "SolicitacaoManutencao")
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
    @Column(name ="fk_cliente")
    @NotNull
    private String fkCliente;
    private String descricao_equipamento;
    private String fk_categoria_equipamento;
    private String descricao_defeito;
    private String fk_estado;

    public Solicitacao(String cliente,String descEquipamento,String descricaoCategoria, String descricaoDefeito, String idSituacao){
        this.fkCliente = cliente;
        this.descricao_equipamento = descEquipamento;
        this.fk_categoria_equipamento = descricaoCategoria;
        this.descricao_defeito = descricaoDefeito;
        this.fk_estado = idSituacao;
    }
}
