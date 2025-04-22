package com.example.web_II.domain.funcionarios;

import java.time.LocalDate;

public record FuncionarioListagemDTO(
        String nome,
        String email,
        LocalDate nascimento
) {
    public FuncionarioListagemDTO(Funcionario funcionario) {
        this(
                funcionario.getUsuario() != null ? funcionario.getUsuario().getNome() : null,
                funcionario.getUsuario() != null ? funcionario.getUsuario().getEmail() : null,
                funcionario.getNascimento()
        );
    }
}

