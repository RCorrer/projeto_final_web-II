package com.example.web_II.domain.usuarios;

public record LoginResponseDTO(String token,
                               String nome,
                               String id,
                               String role,
                               String mensagem) {
}
