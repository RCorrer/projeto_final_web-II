package com.example.web_II.domain.receita;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Table(name = "receita")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
public class Receita {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private float valor;
    private LocalDateTime data_hora;
    private String fk_solicitacao;

    public Receita(float orcamento, LocalDateTime dataHora, String idSolicitacao) {
        this.valor = orcamento;
        this.data_hora = dataHora;
        this.fk_solicitacao = idSolicitacao;

    }
}
