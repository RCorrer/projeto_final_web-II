package com.example.web_II.domain.cliente;

public record CadastroClienteDTO(String nome, String login, String cpf, String telefone,
                                 String cep, String logradouro, String complemento,
                                 String bairro, String localidade,
                                 String uf, String numero) {
}