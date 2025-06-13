package com.example.web_II.repositories;

import com.example.web_II.domain.cliente.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, String> {

    Cliente findByUsuarioId(String id);
    Optional<Cliente> findById(String id);
}
