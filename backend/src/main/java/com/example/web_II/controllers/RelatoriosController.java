package com.example.web_II.controllers;


import com.example.web_II.domain.geral.RespostaPadraoDTO;
import com.example.web_II.domain.receita.RelatorioCategoriaDTO;
import com.example.web_II.domain.receita.RelatorioDTO;
import com.example.web_II.services.RelatorioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping
public class RelatoriosController {

    @Autowired
    RelatorioService relatorioService;
    @Operation(summary = "Gerar relatório em cima dos dias")
    @ApiResponse(responseCode = "200", description = "Listagem da receita de acordo com os dias")
    @GetMapping("/relatorio/receitasPadrao")
    public ResponseEntity<List<RelatorioDTO>> gerarRelatorioDiario(
            @RequestParam @DateTimeFormat(pattern = "yyyyMMdd") LocalDate dataInicio,
            @RequestParam @DateTimeFormat(pattern = "yyyyMMdd") LocalDate dataFim) {

        LocalDateTime inicio = dataInicio.atStartOfDay();
        LocalDateTime fim = dataFim.plusDays(1).atStartOfDay();

        return ResponseEntity.ok(relatorioService.gerarRelatorioPadrao(inicio, fim));
    }

    @Operation(summary = "Gerar relatório em cima das Categorias da loja")
    @ApiResponse(responseCode = "200", description = "Listagem da receita de cada Categoria da loja")
    @GetMapping("/relatorio/receitasCategoria")
    public ResponseEntity<List<RelatorioCategoriaDTO>> gerarRelatorioCategoria() {
        return ResponseEntity.ok(relatorioService.gerarRelatorioCategoria());
    }


}
