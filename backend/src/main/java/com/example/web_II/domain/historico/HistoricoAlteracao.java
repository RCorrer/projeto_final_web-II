package com.example.web_II.domain.historico;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDateTime;

@Table(name = "HistoricoAlteracao")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Getter
@Setter
public class HistoricoAlteracao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "fk_solicitacao")
    @NotNull
    private String fkSolicitacao;

    @Column(nullable = false)
    private String descricao;

    @Column(name = "estado_anterior")
    private String estadoAnterior;

    @Column(name = "estado_novo", nullable = false)
    private String estadoNovo;

    @Column(name = "data_hora")
    private LocalDateTime dataHora;

    public HistoricoAlteracao(String solicitacaoId, String descricao, String estadoAnterior, String estadoNovo) {
        this.fkSolicitacao = solicitacaoId;
        this.descricao = descricao;
        this.estadoAnterior = estadoAnterior;
        this.estadoNovo = estadoNovo;
        this.dataHora = LocalDateTime.now();
    }
}