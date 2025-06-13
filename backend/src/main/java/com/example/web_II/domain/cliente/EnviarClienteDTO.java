package com.example.web_II.domain.cliente;

public record EnviarClienteDTO(String name, String cpf,
                               String email, String telefone,
                               String cep, String logradouro,
                               String complemento, String cidade,
                               String estado) {
}
