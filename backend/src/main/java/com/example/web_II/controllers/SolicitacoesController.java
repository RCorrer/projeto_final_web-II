package com.example.web_II.controllers;


import com.example.web_II.domain.historico.SolicitacaoComHistoricoDTO;
import com.example.web_II.domain.solicitacoes.*;
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


    @PostMapping("/solicitacao/criar")
    public ResponseEntity<String> criarSolicitacao(@RequestBody @Valid AbrirSolicitacaoDTO data){
        return solicitacoesService.criarSolicitacao(data);
    }

    @GetMapping("/solicitacao/buscar/{id}")
    public ResponseEntity<String> buscarSolicitacao(@PathVariable String id){
        return solicitacoesService.buscarSolicitacao(id);
    }

    @GetMapping("/solicitacao/buscarCliente/{cliente}")
    public ResponseEntity<List<SolicitacaoClienteDTO>> buscarSolicitacaoCliente(
            @PathVariable String cliente) {
        return solicitacoesService.buscarSolicitacaoCliente(cliente);
    }

    @PostMapping("/solicitacao/atualizarEstado/orcado")
    public ResponseEntity<String> atualizarEstado(@RequestBody @Valid OrcamentoDTO data) {
        return solicitacoesService.orcamentoService(data);
    }

    @PostMapping("/solicitacao/atualizarEstado/aprovar")
    public ResponseEntity<String> aprovarOrcamento(@RequestBody @Valid AprovarRejeitarDTO data) {
        return solicitacoesService.aprovarOrcamento(data);
    }

    @PostMapping("/solicitacao/atualizarEstado/rejeitar")
    public ResponseEntity<String> rejeitarOrcamento(@RequestBody @Valid AprovarRejeitarDTO data) {
        return solicitacoesService.rejeitarOrcamento(data);
    }

    @PostMapping("/solicitacao/capturarSolicitacao")
    public ResponseEntity<String> atribuirFuncionario(@RequestBody @Valid AtribuirFuncionarioDTO data) {
        return solicitacoesService.atribuirFuncionario(data);
    }

    @PostMapping("/solicitacao/redirecionarSolicitacao")
    public ResponseEntity<String> redirecionarSolicitacao(@RequestBody @Valid RedirecionarSolicitacaoDTO data) {
        return solicitacoesService.redirecionarSolicitacao(data);
    }

    @PostMapping("/solicitacao/atualizarEstado/arrumada")
    public ResponseEntity<String> marcarComoArrumada(@RequestBody @Valid MudarEstadoArrumadaDTO data) {
        return solicitacoesService.marcarComoArrumada(data);
    }

    @PostMapping("/solicitacao/atualizarEstado/paga")
    public ResponseEntity<String> marcarComoPaga(@RequestBody @Valid MudarEstadoDTO data) {
        return solicitacoesService.marcarComoPaga(data);
    }

    @PostMapping("/solicitacao/atualizarEstado/finalizada")
    public ResponseEntity<String> marcarComoFinalizada(@RequestBody @Valid MudarEstadoDTO data) {
        return solicitacoesService.marcarComoFinalizada(data);
    }

    @PostMapping("/solicitacao/atualizarEstado/entregue")
    public ResponseEntity<String> marcarComoEntregue(@RequestBody @Valid MudarEstadoDTO data) {
        return solicitacoesService.marcarComoEntregue(data);
    }

    @GetMapping("/solicitacao/detalhes/{id}")
    public ResponseEntity<SolicitacaoComHistoricoDTO> getSolicitacaoComHistorico(@PathVariable String id) {
        return solicitacoesService.getSolicitacaoComHistorico(id);
    }

    @GetMapping("/solicitacao/funcionario/{funcionarioId}")
    public ResponseEntity<List<SolicitacaoFuncionarioDTO>> getSolicitacoesAbertasOuAlocadasAoFuncionario(@PathVariable String funcionarioId) {
        return solicitacoesService.getSolicitacoesAbertasOuAlocadasAoFuncionario(funcionarioId);
    }
}
