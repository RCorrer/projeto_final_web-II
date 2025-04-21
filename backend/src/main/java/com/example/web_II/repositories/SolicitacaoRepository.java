package com.example.web_II.repositories;

import com.example.web_II.domain.solicitacoes.Solicitacao;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@DynamicUpdate
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, String> {

    boolean existsById(String id);

    Optional<Solicitacao> findById(String id);

    List<Solicitacao> findByFkCliente(String fkCliente);


}
