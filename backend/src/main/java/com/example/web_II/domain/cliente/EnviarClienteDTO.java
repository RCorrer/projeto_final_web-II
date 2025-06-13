package com.example.web_II.domain.cliente;

public record EnviarClienteDTO(String nome, String cpf,
                               String email, String telefone,
                               String cep, String logradouro,
                               String complemento, String localidade,
                               String uf) {
}
