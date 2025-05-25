package com.example.web_II.services;

import com.example.web_II.domain.receita.RelatorioCategoriaDTO;
import com.example.web_II.domain.receita.RelatorioDTO;
import com.example.web_II.repositories.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class RelatorioService {

    @Autowired
    ReceitaRepository  receitaRepository;

    public List<RelatorioDTO> gerarRelatorioPadrao(LocalDateTime inicio, LocalDateTime fim) {
        List<Object[]> resultados = receitaRepository.findReceitaDiariaPorPeriodo(inicio, fim);

        return resultados.stream()
                .map(r -> new RelatorioDTO(
                        ((java.sql.Date) r[0]).toLocalDate(),
                        ((Number) r[1]).doubleValue()
                ))
                .collect(Collectors.toList());
    }

    public List<RelatorioCategoriaDTO> gerarRelatorioCategoria() {
        return receitaRepository.findReceitaPorCategoria();
    }



}
