package com.example.web_II.domain.funcionarios;

import java.time.LocalDate;

public record CadastroFuncionarioDTO(String nome, String email, String senha,
                                     LocalDate dataNascimento) {
}
