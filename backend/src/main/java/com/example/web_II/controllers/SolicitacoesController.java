package com.example.web_II.controllers;


import com.example.web_II.domain.solicitacoes.AbrirSolicitacaoDTO;
import com.example.web_II.domain.solicitacoes.OrcamentoDTO;
import com.example.web_II.domain.solicitacoes.Solicitacao;
import com.example.web_II.repositories.SolicitacaoRepository;
import com.example.web_II.services.SolicitacoesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SolicitacoesController {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private SolicitacoesService solicitacoesService;



    /*
    DEIXEI AQUI PARA SALVAR JUNTO DO CÓDIGO
    {
      "idCliente": "cli1",
      "descEquip": "string",
      "categoria": "cat2",
      "descDefeito": "string"
     }
     */

    @PostMapping("/solicitacao/criar")
    public ResponseEntity<String> criarSolicitacao(@RequestBody @Valid AbrirSolicitacaoDTO data){
        return solicitacoesService.criarSolicitacao(data);
    }

    @GetMapping("/solicitacao/buscar/{id}")
    public ResponseEntity<String> buscarSolicitacao(@PathVariable String id){
        return solicitacoesService.buscarSolicitacao(id);
    }

    @GetMapping("/solicitacao/buscarCliente/{cliente}")
    public ResponseEntity<List<Solicitacao>> buscarSolicitacaoCliente(@PathVariable String cliente){
        return solicitacoesService.buscarSolicitacaoCliente(cliente);
    }

    @PostMapping("/solicitacao/atualizarEstado/orcado")
    public ResponseEntity<String> atualizarEstado(@RequestBody @Valid OrcamentoDTO data) {
        return solicitacoesService.orcamentoService(data.id(), data.valor());
    }
}
