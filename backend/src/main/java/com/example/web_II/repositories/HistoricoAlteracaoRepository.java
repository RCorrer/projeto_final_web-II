package com.example.web_II.repositories;

import com.example.web_II.domain.historico.HistoricoAlteracao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HistoricoAlteracaoRepository extends JpaRepository<HistoricoAlteracao, String> {

    boolean existsById(String id);

    Optional<HistoricoAlteracao> findById(String id);

    List<HistoricoAlteracao> findByFkSolicitacao(String fkSolicitacao);

    List<HistoricoAlteracao> findByEstadoNovo(String estadoNovo);

    List<HistoricoAlteracao> findByEstadoAnterior(String estadoAnterior);

    List<HistoricoAlteracao> findByFkSolicitacaoAndEstadoNovo(String fkSolicitacao, String estadoNovo);
}