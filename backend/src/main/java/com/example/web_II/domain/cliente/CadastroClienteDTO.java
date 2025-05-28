package com.example.web_II.domain.cliente;

import com.example.web_II.domain.enderecos.Endereco;
import com.example.web_II.domain.usuarios.Usuario;

public record CadastroClienteDTO(String name, String login, String cpf, String telefone,
                                 String cep, String logradouro, String complemento,
                                 String bairro, String localidade,
                                 String uf, String numero) {
}