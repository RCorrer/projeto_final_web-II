package com.example.web_II.controllers;


import com.example.web_II.domain.categoria.Categoria;
import com.example.web_II.domain.categoria.CategoriaDTO;
import com.example.web_II.repositories.CategoriaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoriaController {

@Autowired
private CategoriaRepository categoriaRepository;


@PostMapping("/categoria")
public ResponseEntity addCategoria(@RequestBody @Valid CategoriaDTO data){

    if (categoriaRepository.existsByDescricao(data.descricao())){
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Essa categoria já existe");
    }
    Categoria novaCategoria = new Categoria(data.descricao());
    this.categoriaRepository.save(novaCategoria);
    return ResponseEntity.ok("Categoria Adicionada!!");
}



}

