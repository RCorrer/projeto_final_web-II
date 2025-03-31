package com.example.web_II.domain.funcionarios;

import com.example.web_II.domain.usuarios.UsuarioRole;
import java.time.LocalDate;

public record CadastroFuncionarioDTO(String name, String login, String password, LocalDate dataNascimento) {
}
