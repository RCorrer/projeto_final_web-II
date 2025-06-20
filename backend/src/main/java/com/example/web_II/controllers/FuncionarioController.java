package com.example.web_II.controllers;

import com.example.web_II.domain.funcionarios.FuncionarioAtualizacaoDTO;
import com.example.web_II.domain.funcionarios.FuncionarioListagemDTO;
import com.example.web_II.domain.geral.RespostaPadraoDTO;
import com.example.web_II.services.FuncionarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "Listar todos os funcionarios")
    @ApiResponse(responseCode = "200", description = "Listagem de todos os funcionários")
    @GetMapping
    public ResponseEntity<List<FuncionarioListagemDTO>> listarFuncionarios() {
        return funcionarioService.listarTodosFuncionarios();
    }

    @Operation(summary = "Deletar um funcionario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categoria adicionada/ativada corretamente"),
            @ApiResponse(responseCode = "404", description = "Funcionário não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<RespostaPadraoDTO> deletarFuncionario(@PathVariable String id) {
        return funcionarioService.deletarFuncionario(id);
    }


    @Operation(summary = "Editar um funcionario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categoria adicionada/ativada corretamente"),
            @ApiResponse(responseCode = "404", description = "Funcionário não encontrado no sistema",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PutMapping
    @Transactional
    public ResponseEntity<FuncionarioListagemDTO> atualizarFuncionario(@RequestBody FuncionarioAtualizacaoDTO data) {
        return funcionarioService.atualizarFuncionario(data);
    }


}
