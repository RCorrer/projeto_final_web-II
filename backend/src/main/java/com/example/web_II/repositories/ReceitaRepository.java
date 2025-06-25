package com.example.web_II.repositories;

import com.example.web_II.domain.receita.Receita;
import com.example.web_II.domain.receita.RelatorioCategoriaDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;


public interface ReceitaRepository  extends JpaRepository<Receita,String> {

    @Query("SELECT FUNCTION('DATE', r.data_hora), SUM(r.valor) " +
            "FROM Receita r " +
            "WHERE (:inicio IS NULL OR r.data_hora >= :inicio) " +
            "AND (:fim IS NULL OR r.data_hora < :fim) " +
            "GROUP BY FUNCTION('DATE', r.data_hora) " +
            "ORDER BY FUNCTION('DATE', r.data_hora)")
    List<Object[]> findReceitaDiariaPorPeriodo(
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim);

    @Query("SELECT NEW com.example.web_II.domain.receita.RelatorioCategoriaDTO(" +
        "c.descricao, " + 
       "SUM(r.valor), " +
       "COUNT(r.id)) " +
       "FROM Receita r " +
       "JOIN Solicitacao s ON r.fk_solicitacao = s.id " +
       "JOIN Categoria c ON s.fkCategoriaEquipamento = c.id " +
       "GROUP BY c.descricao")
    List<RelatorioCategoriaDTO> findReceitaPorCategoria();


}
