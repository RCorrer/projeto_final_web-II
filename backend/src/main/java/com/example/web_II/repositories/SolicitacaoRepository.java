package com.example.web_II.repositories;

import com.example.web_II.domain.solicitacoes.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, String> {
}
