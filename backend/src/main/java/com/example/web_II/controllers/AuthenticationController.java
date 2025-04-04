package com.example.web_II.controllers;

import com.example.web_II.domain.cliente.CadastroClienteDTO;
import com.example.web_II.domain.usuarios.AuthenticationDTO;
import com.example.web_II.domain.funcionarios.CadastroFuncionarioDTO;
import com.example.web_II.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        var response = authService.authenticate(data);
        return ResponseEntity.ok(response);
    }

    @Transactional
    @PostMapping("/cadastro/funcionario")
    public ResponseEntity registerFuncionario(@RequestBody @Valid CadastroFuncionarioDTO data) {
        return authService.registerFuncionario(data);
    }

    @Transactional
    @PostMapping("/cadastro/cliente")
    public ResponseEntity registerCliente(@RequestBody @Valid CadastroClienteDTO data) {
        return authService.registerCliente(data);
    }
}

