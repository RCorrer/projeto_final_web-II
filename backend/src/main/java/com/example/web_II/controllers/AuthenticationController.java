package com.example.web_II.controllers;

import com.example.web_II.domain.funcionarios.Funcionario;
import com.example.web_II.domain.usuarios.AuthenticationDTO;
import com.example.web_II.domain.usuarios.LoginResponseDTO;
import com.example.web_II.domain.funcionarios.CadastroFuncionarioDTO;
import com.example.web_II.domain.usuarios.Usuario;
import com.example.web_II.domain.usuarios.UsuarioRole;
import com.example.web_II.infra.security.TokenService;
import com.example.web_II.repositories.FuncionarioRepository;
import com.example.web_II.repositories.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private FuncionarioRepository funcionarioRepository;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Usuario) auth.getPrincipal());

        var userDetails = this.usuarioRepository.findByEmail(data.login());

        return ResponseEntity.ok(new LoginResponseDTO(
                token,
                userDetails.getNome(),
                userDetails.getId(),
                userDetails.getRole().toString(),
                "Login efetuado com sucesso"
        ));
    }

    @PostMapping("/cadastro/funcionario")
    public ResponseEntity register(@RequestBody @Valid CadastroFuncionarioDTO data){
        if(this.usuarioRepository.findUserDetailsByEmail(data.login()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        Usuario novoUsuario = new Usuario(data.name(), data.login(), encryptedPassword, UsuarioRole.FUNCIONARIO);

        Funcionario novoFuncionario = new Funcionario(data.dataNascimento(), novoUsuario);

        this.usuarioRepository.save(novoUsuario);
        this.funcionarioRepository.save(novoFuncionario);

        return ResponseEntity.ok("Funcionário cadastrado com sucesso");
    }
}
