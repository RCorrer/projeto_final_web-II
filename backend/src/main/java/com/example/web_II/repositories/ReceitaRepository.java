package com.example.web_II.repositories;

import com.example.web_II.domain.receita.Receita;
import com.example.web_II.domain.receita.RelatorioCategoriaDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;


public interface ReceitaRepository  extends JpaRepository<Receita,String> {

    @Query(value = """
    SELECT 
        CAST(r.data_hora AS DATE) as data_dia, 
        SUM(r.valor) as total
    FROM 
        receita r
    WHERE 
        r.data_hora >= :inicio AND r.data_hora <= :fim
    GROUP BY 
        CAST(r.data_hora AS DATE)
    ORDER BY 
        CAST(r.data_hora AS DATE)
    """, nativeQuery = true)
    List<Object[]> findReceitaDiariaPorPeriodo(
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim);


    @Query("SELECT NEW com.example.web_II.domain.receita.RelatorioCategoriaDTO(" +
            "s.fk_categoria_equipamento, " +
            "SUM(r.valor), " +
            "COUNT(r.id)) " +
            "FROM Receita r JOIN Solicitacao s ON r.fk_solicitacao = s.id " +
            "GROUP BY s.fk_categoria_equipamento")
    List<RelatorioCategoriaDTO> findReceitaPorCategoria();


}
