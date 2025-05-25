package com.example.web_II.controllers;

import com.example.web_II.domain.categoria.Categoria;
import com.example.web_II.domain.categoria.CategoriaDTO;
import com.example.web_II.repositories.CategoriaRepository;
import com.example.web_II.services.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/categoria/listar")
    public ResponseEntity<List<Categoria>> listarCategorias() {
        List<Categoria> categorias = categoriaService.buscarTodas();
        return ResponseEntity.ok(categorias);
    }

    @DeleteMapping("/categoria/excluir/{descricao}")
    public ResponseEntity<String> removeCategoria(@PathVariable String descricao){
        return categoriaService.deleteCategoryResponse(descricao);
    }

    @PutMapping("/categoria/edita/{descricao}")
    public ResponseEntity<String> editarCategoria(@PathVariable String descricao ,@RequestBody CategoriaDTO data){
        return categoriaService.editarCategoria(descricao,data);
    }



}






