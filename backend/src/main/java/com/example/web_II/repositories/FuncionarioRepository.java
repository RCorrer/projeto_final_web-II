package com.example.web_II.repositories;

import com.example.web_II.domain.funcionarios.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, String> {
}
