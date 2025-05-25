package com.example.web_II.repositories;

import com.example.web_II.domain.solicitacoes.Solicitacao;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@DynamicUpdate
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, String> {

    boolean existsById(String id);

    Optional<Solicitacao> findById(String id);

    List<Solicitacao> findByFkCliente(String fkCliente);

    @EntityGraph(attributePaths = {"historicoAlteracoes"})
    @Query("SELECT s FROM Solicitacao s LEFT JOIN FETCH s.historicoAlteracoes WHERE s.id = :id")
    Optional<Solicitacao> findByIdWithHistorico(String id);
}
