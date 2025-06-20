package com.example.web_II.controllers;

import com.example.web_II.domain.cliente.CadastroClienteDTO;
import com.example.web_II.domain.geral.RespostaPadraoDTO;
import com.example.web_II.domain.usuarios.AuthenticationDTO;
import com.example.web_II.domain.funcionarios.CadastroFuncionarioDTO;
import com.example.web_II.domain.usuarios.LoginResponseDTO;
import com.example.web_II.exceptions.LoginNotFoundException;
import com.example.web_II.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    @Autowired
    private AuthService authService;



    @Operation(summary = "Realizar Login")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login Realizado"),
            @ApiResponse(responseCode = "404", description = "Conta não encontrada (email/senha invalidos)",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) {
        try {
            var response = authService.authenticate(data);
            return ResponseEntity.ok(response);
        } catch (LoginNotFoundException | BadCredentialsException ex) {
            throw new LoginNotFoundException();
        }
    }

    @Operation(summary = "Adicionar um funcionario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categoria adicionada/ativada corretamente"),
            @ApiResponse(responseCode = "412", description = "Email já cadastrado",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @Transactional
    @PostMapping("/cadastro/funcionario")
    public ResponseEntity<RespostaPadraoDTO> registerFuncionario(@RequestBody @Valid CadastroFuncionarioDTO data) {
        return authService.registerFuncionario(data);
    }


    @Operation(summary = "Adicionar um cliente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categoria adicionada/ativada corretamente"),
            @ApiResponse(responseCode = "412", description = "Email/CPF já cadastrado",
                    content = @Content(schema = @Schema(implementation = RespostaPadraoDTO.class)))
    })
    @Transactional
    @PostMapping("/cadastro/cliente")
    public ResponseEntity<RespostaPadraoDTO> registerCliente(@RequestBody @Valid CadastroClienteDTO data) {
        return authService.registerCliente(data);
    }
}

