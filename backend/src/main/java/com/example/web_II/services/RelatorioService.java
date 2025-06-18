package com.example.web_II.services;

import com.example.web_II.domain.receita.RelatorioCategoriaDTO;
import com.example.web_II.domain.receita.RelatorioDTO;
import com.example.web_II.repositories.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
public class RelatorioService {

    @Autowired
    ReceitaRepository  receitaRepository;

    public List<RelatorioDTO> gerarRelatorioPadrao(LocalDateTime inicio, LocalDateTime fim) {
        try {
            List<Object[]> resultados = receitaRepository.findReceitaDiariaPorPeriodo(inicio, fim);

            return resultados.stream()
                    .map(r -> {
                        Objects.requireNonNull(r, "Resultado nulo encontrado");
                        return new RelatorioDTO(
                                convertToLocalDate(r[0]),
                                convertToDouble(r[1])
                        );
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Falha ao gerar relatório", e);
        }
    }

    private LocalDate convertToLocalDate(Object dateObj) {
        if (dateObj == null) return LocalDate.now();
        if (dateObj instanceof java.sql.Date) return ((java.sql.Date) dateObj).toLocalDate();
        if (dateObj instanceof Date) return ((Date) dateObj).toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        throw new IllegalArgumentException("Tipo de data não suportado: " + dateObj.getClass());
    }

    private double convertToDouble(Object valueObj) {
        if (valueObj == null) return 0.0;
        if (valueObj instanceof Number) return ((Number) valueObj).doubleValue();
        throw new IllegalArgumentException("Tipo de valor não suportado: " + valueObj.getClass());
    }

    public List<RelatorioCategoriaDTO> gerarRelatorioCategoria() {
        return receitaRepository.findReceitaPorCategoria();
    }



}
