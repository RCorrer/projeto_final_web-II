package com.example.web_II.repositories;

import com.example.web_II.domain.solicitacoes.Solicitacao;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@DynamicUpdate
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, String> {

    boolean existsById(String id);

    Optional<Solicitacao> findById(String id);

    @EntityGraph(attributePaths = {"funcionario", "funcionario.usuario", "historicoAlteracoes"})
    List<Solicitacao> findByFkCliente(String fkCliente);

    @EntityGraph(attributePaths = {"historicoAlteracoes"})
    @Query("SELECT s FROM Solicitacao s LEFT JOIN FETCH s.historicoAlteracoes WHERE s.id = :id")
    Optional<Solicitacao> findByIdWithHistorico(String id);

    @Query("SELECT s FROM Solicitacao s WHERE s.fk_estado IN ('1') OR (s.funcionario IS NOT NULL AND s.funcionario.id = :funcionarioId)")
    List<Solicitacao> findSolicitacoesAbertasOuAlocadasAoFuncionario(@Param("funcionarioId") String funcionarioId);

    @Modifying
    @Query("UPDATE Solicitacao s SET s.funcionario = null WHERE s.funcionario.id = :funcionarioId")
    void updateFuncionarioToNull(@Param("funcionarioId") String funcionarioId);
}
