package com.example.web_II.services;


import com.example.web_II.domain.solicitacoes.AbrirSolicitacaoDTO;
import com.example.web_II.domain.solicitacoes.Solicitacao;
import com.example.web_II.repositories.SolicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SolicitacoesService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;


    public ResponseEntity<String> criarSolicitacao (AbrirSolicitacaoDTO data){
        Solicitacao novaSolicitacao = new Solicitacao(data.idCliente(),data.descEquip(),data.categoria(),data.descDefeito(),"1");

        this.solicitacaoRepository.save(novaSolicitacao);
        return ResponseEntity.ok("Solicitação criada com sucesso:\n"
                + "ID do cliente: " + novaSolicitacao.getFkCliente() + "\n" +
                "Descricao defeito:" + novaSolicitacao.getDescricao_defeito());

    }
}
