package com.example.web_II.controllers;

import ch.qos.logback.core.boolex.EvaluationException;
import com.example.web_II.domain.categoria.Categoria;
import com.example.web_II.domain.categoria.CategoriaDTO;
import com.example.web_II.domain.geral.RespostaPadraoDTO;
import com.example.web_II.exceptions.CategoriaJaExisteException;
import com.example.web_II.repositories.CategoriaRepository;
import com.example.web_II.services.CategoriaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private CategoriaService categoriaService;


    @Operation(summary = "Adicionar uma categoria ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categoria adicionada/ativada corretamente"),
            @ApiResponse(responseCode = "412", description = "Categoria já existe",
            content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PostMapping("/categoria")
    public ResponseEntity<RespostaPadraoDTO> addCategoria(@RequestBody @Valid CategoriaDTO data){
        return categoriaService.addCategoryResponse(data);
    }



    @Operation(summary = "Listar todas as categorias ativas ")
    @GetMapping("/categoria")
    public ResponseEntity<List<String>> listaCategoria(){
        return categoriaService.listCategoryResponse();
    }

    @Operation(summary = "Deletar uma categoria")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categoria desativada corretamente"),
            @ApiResponse(responseCode = "404", description = "Categoria inexistente",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @DeleteMapping("/categoria/{descricao}")
    public ResponseEntity<RespostaPadraoDTO> removeCategoria(@PathVariable String descricao){
        return categoriaService.deleteCategoryResponse(descricao);
    }



    @Operation(summary = "Editar uma categoria")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categoria atualizada corretamente"),
            @ApiResponse(responseCode = "412", description = "Categoria já existe",
            content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class))),
            @ApiResponse(responseCode = "404", description = "Categoria inexistente",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PutMapping("/categoria/{descricao}")
    public ResponseEntity<RespostaPadraoDTO> editarCategoria(@PathVariable String descricao ,@RequestBody CategoriaDTO data){
        return categoriaService.editarCategoria(descricao,data);
    }



}






