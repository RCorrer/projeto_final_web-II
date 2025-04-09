package com.example.web_II.controllers;


import com.example.web_II.domain.solicitacoes.AbrirSolicitacaoDTO;
import com.example.web_II.repositories.CategoriaRepository;
import com.example.web_II.repositories.SolicitacaoRepository;
import com.example.web_II.services.SolicitacoesService;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SolicitacoesController {



    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private SolicitacoesService solicitacoesService;



    @PostMapping("/solicitacao/criar")
    public ResponseEntity<String> criarSolicitacao(@RequestBody @Valid AbrirSolicitacaoDTO data){
        return solicitacoesService.criarSolicitacao(data);
    }






}
