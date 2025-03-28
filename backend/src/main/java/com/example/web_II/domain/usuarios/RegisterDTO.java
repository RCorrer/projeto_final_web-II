package com.example.web_II.domain.usuarios;

public record RegisterDTO(String name, String login, String password, UsuarioRole role) {
}
