package com.example.web_II.repositories;

import com.example.web_II.domain.categoria.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, String> {

    boolean existsByDescricao(String descricao);

    Optional<Categoria> findByDescricao(String descricao);
}
