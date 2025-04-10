package com.example.web_II.services;


import com.example.web_II.domain.solicitacoes.AbrirSolicitacaoDTO;
import com.example.web_II.domain.solicitacoes.Solicitacao;
import com.example.web_II.repositories.SolicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

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

    public ResponseEntity<String> buscarSolicitacao(String id){
        if (!solicitacaoRepository.existsById(id)){
            return ResponseEntity.ok("Esta OS não existe!!");
        }
        Optional<Solicitacao> solicitacaoBuscada = solicitacaoRepository.findById(id);
        return ResponseEntity.ok(solicitacaoBuscada.get().getId() + "\n" +
                solicitacaoBuscada.get().getFkCliente() + "\n" +
                solicitacaoBuscada.get().getDescricao_equipamento() + "\n" +
                solicitacaoBuscada.get().getFk_categoria_equipamento() + "\n" +
                solicitacaoBuscada.get().getDescricao_defeito() + "\n" +
                solicitacaoBuscada.get().getFk_estado() + "\n" +
                solicitacaoBuscada.get().getData_hora() + "\n" +
                solicitacaoBuscada.get().getFk_funcionario());


    }
}
