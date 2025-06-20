package com.example.web_II.controllers;


import com.example.web_II.domain.geral.RespostaPadraoDTO;
import com.example.web_II.domain.historico.SolicitacaoComHistoricoDTO;
import com.example.web_II.domain.solicitacoes.*;
import com.example.web_II.repositories.SolicitacaoRepository;
import com.example.web_II.services.SolicitacoesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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


    @Operation(summary = "Criar uma solicitacao")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacao criada corretamente"),
            @ApiResponse(responseCode = "400", description = "Cliente/Categoria da criação invalida ou inexistente",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PostMapping("/solicitacao/criar")
    public ResponseEntity<RespostaPadraoDTO> criarSolicitacao(@RequestBody @Valid AbrirSolicitacaoDTO data){
        return solicitacoesService.criarSolicitacao(data);
    }

    public ResponseEntity<String> buscarSolicitacao(@PathVariable String id){
        return solicitacoesService.buscarSolicitacao(id);
    }

    @Operation(summary = "Buscar solicitacoes de um cliente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacoes buscadas corretamente"),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @GetMapping("/solicitacao/buscarCliente/{cliente}")
    public ResponseEntity<List<SolicitacaoClienteDTO>> buscarSolicitacaoCliente(
            @PathVariable String cliente) {
        return solicitacoesService.buscarSolicitacaoCliente(cliente);
    }

    @Operation(summary = "Alterar solicitação para orçada")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacoes buscadas corretamente"),
            @ApiResponse(responseCode = "404", description = "Solicitacao não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "409", description = "Fluxo da solicitacao incorreto",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "500", description = "Falha interna ao buscar a solicitacao",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PostMapping("/solicitacao/atualizarEstado/orcado")
    public ResponseEntity<RespostaPadraoDTO> atualizarEstado(@RequestBody @Valid OrcamentoDTO data) {
        return solicitacoesService.orcamentoService(data);
    }

    @Operation(summary = "Alterar solicitacao para aprovada")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacoes buscadas corretamente"),
            @ApiResponse(responseCode = "404", description = "Solicitacao não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "409", description = "Fluxo da solicitacao incorreto",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "500", description = "Falha interna ao buscar a solicitacao",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PostMapping("/solicitacao/atualizarEstado/aprovar")
    public ResponseEntity<RespostaPadraoDTO> aprovarOrcamento(@RequestBody @Valid AprovarRejeitarDTO data) {
        return solicitacoesService.aprovarOrcamento(data);
    }


    @Operation(summary = "Alterar solicitacao para reijeitada")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacoes buscadas corretamente"),
            @ApiResponse(responseCode = "404", description = "Solicitacao não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "409", description = "Fluxo da solicitacao incorreto",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "500", description = "Falha interna ao buscar a solicitacao",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PostMapping("/solicitacao/atualizarEstado/rejeitar")
    public ResponseEntity<RespostaPadraoDTO> rejeitarOrcamento(@RequestBody @Valid AprovarRejeitarDTO data) {
        return solicitacoesService.rejeitarOrcamento(data);
    }
    @Operation(summary = "Funcionario capturar solicitacao")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacoes buscadas corretamente"),
            @ApiResponse(responseCode = "404", description = "Solicitacao/Funcionario não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "409", description = "Fluxo da solicitacao incorreto",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "500", description = "Falha interna ao buscar a solicitacao",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PostMapping("/solicitacao/capturarSolicitacao")
    public ResponseEntity<RespostaPadraoDTO> atribuirFuncionario(@RequestBody @Valid AtribuirFuncionarioDTO data) {
        return solicitacoesService.atribuirFuncionario(data);
    }

    @Operation(summary = "Enviar solicitacao para outro funcionario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacoes buscadas corretamente"),
            @ApiResponse(responseCode = "400", description = "Funcionário não é o atual atribuinte da solicitacao",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "404", description = "Solicitacao não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "409", description = "Fluxo da solicitacao incorreto",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "500", description = "Falha interna ao buscar a solicitacao",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PostMapping("/solicitacao/redirecionarSolicitacao")
    public ResponseEntity<RespostaPadraoDTO> redirecionarSolicitacao(@RequestBody @Valid RedirecionarSolicitacaoDTO data) {
        return solicitacoesService.redirecionarSolicitacao(data);
    }

    @Operation(summary = "Alterar solicitação para arrumada")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacoes buscadas corretamente"),
            @ApiResponse(responseCode = "404", description = "Solicitacao não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "409", description = "Fluxo da solicitacao incorreto",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "500", description = "Falha interna ao buscar a solicitacao",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PostMapping("/solicitacao/atualizarEstado/arrumada")
    public ResponseEntity<RespostaPadraoDTO> marcarComoArrumada(@RequestBody @Valid MudarEstadoArrumadaDTO data) {
        return solicitacoesService.marcarComoArrumada(data);
    }

    @Operation(summary = "Alterar solicitação para paga")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacoes buscadas corretamente"),
            @ApiResponse(responseCode = "404", description = "Solicitacao não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "409", description = "Fluxo da solicitacao incorreto",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "500", description = "Falha interna ao buscar a solicitacao",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PostMapping("/solicitacao/atualizarEstado/paga")
    public ResponseEntity<RespostaPadraoDTO> marcarComoPaga(@RequestBody @Valid MudarEstadoDTO data) {
        return solicitacoesService.marcarComoPaga(data);
    }

    @Operation(summary = "Alterar solicitação para finalizada")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacoes buscadas corretamente"),
            @ApiResponse(responseCode = "404", description = "Solicitacao não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "409", description = "Fluxo da solicitacao incorreto",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "500", description = "Falha interna ao buscar a solicitacao",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PostMapping("/solicitacao/atualizarEstado/finalizada")
    public ResponseEntity<RespostaPadraoDTO> marcarComoFinalizada(@RequestBody @Valid MudarEstadoDTO data) {
        return solicitacoesService.marcarComoFinalizada(data);
    }

    @Operation(summary = "Alter solicitação para entregue")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacoes buscadas corretamente"),
            @ApiResponse(responseCode = "404", description = "Solicitacao não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "409", description = "Fluxo da solicitacao incorreto",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "500", description = "Falha interna ao buscar a solicitacao",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PostMapping("/solicitacao/atualizarEstado/entregue")
    public ResponseEntity<RespostaPadraoDTO> marcarComoEntregue(@RequestBody @Valid MudarEstadoDTO data) {
        return solicitacoesService.marcarComoEntregue(data);
    }


    @Operation(summary = "Buscar uma solicitacao")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacao buscada corretamente"),
            @ApiResponse(responseCode = "404", description = "Solicitacao não encontrada no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @GetMapping("/solicitacao/detalhes/{id}")
    public ResponseEntity<SolicitacaoComHistoricoDTO> getSolicitacaoComHistorico(@PathVariable String id) {
        return solicitacoesService.getSolicitacaoComHistorico(id);
    }


    @Operation(summary = "Buscar todas as solicitacoes de um funcionario junto das sem funcionario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitacao buscada corretamente"),
            @ApiResponse(responseCode = "404", description = "Funcionario não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @GetMapping("/solicitacao/funcionario/{funcionarioId}")
    public ResponseEntity<List<SolicitacaoFuncionarioDTO>> getSolicitacoesAbertasOuAlocadasAoFuncionario(@PathVariable String funcionarioId) {
        return solicitacoesService.getSolicitacoesAbertasOuAlocadasAoFuncionario(funcionarioId);
    }
}
