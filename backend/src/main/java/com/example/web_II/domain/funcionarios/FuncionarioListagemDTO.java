package com.example.web_II.domain.funcionarios;

import java.time.LocalDate;

public record FuncionarioListagemDTO(
        String id,
        String usuarioId,
        String nome,
        String email,
        LocalDate nascimento
) {
    public FuncionarioListagemDTO(Funcionario funcionario) {
        this(
                funcionario.getId() != null ? funcionario.getId() : null,
                funcionario.getUsuario() != null ? funcionario.getUsuario().getId() : null,
                funcionario.getUsuario() != null ? funcionario.getUsuario().getNome() : null,
                funcionario.getUsuario() != null ? funcionario.getUsuario().getEmail() : null,
                funcionario.getNascimento()
        );
    }
}

