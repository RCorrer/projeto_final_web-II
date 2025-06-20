package com.example.web_II.controllers;

import com.example.web_II.domain.cliente.CadastroClienteDTO;
import com.example.web_II.domain.geral.RespostaPadraoDTO;
import com.example.web_II.domain.usuarios.AuthenticationDTO;
import com.example.web_II.domain.funcionarios.CadastroFuncionarioDTO;
import com.example.web_II.domain.usuarios.LoginResponseDTO;
import com.example.web_II.exceptions.LoginNotFoundException;
import com.example.web_II.services.AuthService;
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

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) {
        try {
            var response = authService.authenticate(data);
            return ResponseEntity.ok(response);
        } catch (LoginNotFoundException ex) {
            throw new LoginNotFoundException();
        } catch (BadCredentialsException ex) {
            throw new LoginNotFoundException();
        }
    }

    @Transactional
    @PostMapping("/cadastro/funcionario")
    public ResponseEntity registerFuncionario(@RequestBody @Valid CadastroFuncionarioDTO data) {
        return authService.registerFuncionario(data);
    }

    @Transactional
    @PostMapping("/cadastro/cliente")
    public ResponseEntity<RespostaPadraoDTO> registerCliente(@RequestBody @Valid CadastroClienteDTO data) {
        return authService.registerCliente(data);
    }
}

