package com.example.web_II.repositories;

import com.example.web_II.domain.categoria.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, String> {
    boolean existsByDescricao(String descricao);
}
