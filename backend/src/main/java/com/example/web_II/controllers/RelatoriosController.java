package com.example.web_II.controllers;


import com.example.web_II.domain.receita.RelatorioCategoriaDTO;
import com.example.web_II.domain.receita.RelatorioDTO;
import com.example.web_II.services.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping
public class RelatoriosController {

    @Autowired
    RelatorioService relatorioService;

    @GetMapping("/relatorio/receitasPadrao")
    public ResponseEntity<List<RelatorioDTO>> gerarRelatorioDiario(
            @RequestParam String dataInicio,
            @RequestParam String dataFim) {

        LocalDateTime inicio = LocalDate.parse(dataInicio).atStartOfDay();
        LocalDateTime fim = LocalDate.parse(dataFim).plusDays(1).atStartOfDay();

        return ResponseEntity.ok(relatorioService.gerarRelatorioPadrao(inicio, fim));
    }

    @GetMapping("/relatorio/receitasCategoria")
    public ResponseEntity<List<RelatorioCategoriaDTO>> gerarRelatorioCategoria() {
        return ResponseEntity.ok(relatorioService.gerarRelatorioCategoria());
    }


}
