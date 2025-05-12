package com.example.web_II.domain.funcionarios;

import com.example.web_II.domain.usuarios.UsuarioRole;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record FuncionarioAtualizacaoDTO(
        @NotNull
        String id,
        String nome,
        String email,
        String senha,
        LocalDate nascimento,
        UsuarioRole role
) {}