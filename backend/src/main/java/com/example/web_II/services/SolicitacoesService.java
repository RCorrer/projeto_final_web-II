package com.example.web_II.services;


import com.example.web_II.domain.solicitacoes.AbrirSolicitacaoDTO;
import com.example.web_II.domain.solicitacoes.Solicitacao;
import com.example.web_II.repositories.ClienteRepository;
import com.example.web_II.repositories.SolicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SolicitacoesService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private ClienteRepository clienteRepository;


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

    public ResponseEntity<List<Solicitacao>> buscarSolicitacaoCliente(String cliente){
        if (!clienteRepository.existsById(cliente)){
            return ResponseEntity.notFound().build();
        }
        List<Solicitacao> listaSoliciacoes = solicitacaoRepository.findByFkCliente(cliente);

        return ResponseEntity.ok(listaSoliciacoes);


    }

    public ResponseEntity<String> orcamentoService(String id, float valor) {
        if (!solicitacaoRepository.existsById(id)){
            return ResponseEntity.ok("Esta OS não existe!!");
        }

        Optional<Solicitacao> solicitacaoOpt = solicitacaoRepository.findById(id);

        Solicitacao solicitacao = solicitacaoOpt.get();

        solicitacao.setFk_estado("2");
        solicitacao.setOrcamento(valor);

        solicitacaoRepository.save(solicitacao);

        return ResponseEntity.ok("Orçamento realizado com sucesso.");
    }


}
