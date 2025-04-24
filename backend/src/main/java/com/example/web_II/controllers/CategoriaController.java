package com.example.web_II.controllers;

import com.example.web_II.domain.categoria.Categoria;
import com.example.web_II.domain.categoria.CategoriaDTO;
import com.example.web_II.repositories.CategoriaRepository;
import com.example.web_II.services.CategoriaService;
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



    @PostMapping("/categoria/adicionar")
    public ResponseEntity<String> addCategoria(@RequestBody @Valid CategoriaDTO data){
        return categoriaService.addCategoryResponse(data);
    }

    //Melhorar posteriormente
    @GetMapping("/categoria/listar")
    public ResponseEntity<List<String>> listaCategoria(){
        return categoriaService.listCategoryResponse();
    }

    @DeleteMapping("/categoria/excluir/{descricao}")
    public ResponseEntity<String> removeCategoria(@PathVariable String descricao){
        return categoriaService.deleteCategoryResponse(descricao);
    }

    //ENDPOINT DE BUSCAR PRECISA SER FEITO



}






