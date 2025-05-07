package com.example.web_II.repositories;

import com.example.web_II.domain.receita.Receita;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceitaRepository  extends JpaRepository<Receita,String> {
}
