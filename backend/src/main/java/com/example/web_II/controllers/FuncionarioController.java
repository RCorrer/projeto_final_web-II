package com.example.web_II.controllers;

import com.example.web_II.domain.funcionarios.FuncionarioAtualizacaoDTO;
import com.example.web_II.domain.funcionarios.FuncionarioListagemDTO;
import com.example.web_II.services.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping
    public ResponseEntity<List<FuncionarioListagemDTO>> listarFuncionarios() {
        return funcionarioService.listarTodosFuncionarios();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarFuncionario(@PathVariable String id) {
        return funcionarioService.deletarFuncionario(id);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<FuncionarioListagemDTO> atualizarFuncionario(@RequestBody FuncionarioAtualizacaoDTO data) {
        return funcionarioService.atualizarFuncionario(data);
    }


}
