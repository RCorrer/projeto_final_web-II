package com.example.web_II.domain.usuarios;

public record LoginResponseDTO(String token,
                               String nome,
                               String idRole,
                               String id,
                               String role,
                               String mensagem) {
}
