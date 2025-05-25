package com.example.web_II.domain.funcionarios;


import com.example.web_II.domain.usuarios.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Table(name = "Funcionarios")
@Entity(name = "Funcionario")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private LocalDate nascimento;

    @OneToOne
    @JoinColumn(name = "fk_usuario", nullable = false)
    private Usuario usuario;

    public Funcionario(LocalDate nascimento, Usuario novoUsuario) {
        this.nascimento = nascimento;
        this.usuario = novoUsuario;
    }
}
