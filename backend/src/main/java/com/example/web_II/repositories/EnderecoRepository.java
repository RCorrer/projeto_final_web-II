package com.example.web_II.repositories;

import com.example.web_II.domain.enderecos.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnderecoRepository extends JpaRepository<Endereco, String> {
}
