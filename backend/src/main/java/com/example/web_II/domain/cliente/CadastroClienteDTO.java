package com.example.web_II.domain.cliente;

public record CadastroClienteDTO(String name, String login, String cpf, String telefone,
                                 String cep, String logradouro, String complemento,
                                 String unidade, String bairro, String localidade,
                                 String uf, String estado, String regiao, String numero) {
}
