package com.example.web_II.controllers;

import com.example.web_II.domain.funcionarios.FuncionarioListagemDTO;
import com.example.web_II.services.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping
    public Page<FuncionarioListagemDTO> listarFuncionarios(Pageable pageable) {
        return funcionarioService.listarTodosFuncionarios(pageable);
    }

    @DeleteMapping("/{id}")
    public void deletarFuncionario(@PathVariable String id) {
        funcionarioService.deletarFuncionario(id);
    }


}
