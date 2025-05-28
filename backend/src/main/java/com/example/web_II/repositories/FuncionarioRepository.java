package com.example.web_II.repositories;

import com.example.web_II.domain.funcionarios.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface FuncionarioRepository extends JpaRepository<Funcionario, String> {
    @EntityGraph(attributePaths = {"usuario"})
    Page<Funcionario> findAll(Pageable pageable);

    @Transactional
    void deleteById(String id);

    Funcionario findByUsuarioId(String id);
}
