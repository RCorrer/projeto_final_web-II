package com.example.web_II.services;

import com.example.web_II.domain.cliente.CadastroClienteDTO;
import com.example.web_II.domain.cliente.Cliente;
import com.example.web_II.domain.enderecos.Endereco;
import com.example.web_II.domain.funcionarios.CadastroFuncionarioDTO;
import com.example.web_II.domain.funcionarios.Funcionario;
import com.example.web_II.domain.usuarios.AuthenticationDTO;
import com.example.web_II.domain.usuarios.LoginResponseDTO;
import com.example.web_II.domain.usuarios.Usuario;
import com.example.web_II.domain.usuarios.UsuarioRole;
import com.example.web_II.exceptions.EmailJaCadastradoException;
import com.example.web_II.exceptions.LoginNotFoundException;
import com.example.web_II.infra.security.TokenService;
import com.example.web_II.repositories.ClienteRepository;
import com.example.web_II.repositories.EnderecoRepository;
import com.example.web_II.repositories.FuncionarioRepository;
import com.example.web_II.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private TokenService tokenService;

    public LoginResponseDTO authenticate(AuthenticationDTO data) {
        var userDetails = usuarioRepository.findByEmail(data.login());

        if (userDetails == null) {
            throw new LoginNotFoundException();
        }

        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
            var auth = authenticationManager.authenticate(usernamePassword);

            var token = tokenService.generateToken((Usuario) auth.getPrincipal());

            return new LoginResponseDTO(
                    token,
                    userDetails.getNome(),
                    userDetails.getId(),
                    userDetails.getRole().toString(),
                    "Login efetuado com sucesso"
            );
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Senha inválida");
        }
    }

    public ResponseEntity registerFuncionario(CadastroFuncionarioDTO data) {
        if (usuarioRepository.findUserDetailsByEmail(data.login()) != null)
            throw new EmailJaCadastradoException();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        Usuario novoUsuario = new Usuario(data.name(), data.login(), encryptedPassword, UsuarioRole.FUNCIONARIO);

        Funcionario novoFuncionario = new Funcionario(data.dataNascimento(), novoUsuario);

        usuarioRepository.save(novoUsuario);
        funcionarioRepository.save(novoFuncionario);

        return ResponseEntity.ok("Funcionário cadastrado com sucesso");
    }

    public ResponseEntity registerCliente(CadastroClienteDTO data) {
        if (usuarioRepository.findUserDetailsByEmail(data.login()) != null)
            return ResponseEntity.badRequest().build();

        // Gera senha aleatória
        String senha = Cliente.gerarSenha();
        String encryptedPassword = new BCryptPasswordEncoder().encode(senha);
        Usuario novoUsuario = new Usuario(data.name(), data.login(), encryptedPassword, UsuarioRole.CLIENTE);

        Endereco novoEndereco = new Endereco(
                data.cep(), data.logradouro(), data.complemento(),
                data.bairro(), data.localidade(), data.uf(), data.numero()
        );

        Cliente novoCliente = new Cliente(data.cpf(), data.telefone(), novoEndereco, novoUsuario);

        enderecoRepository.save(novoEndereco);
        usuarioRepository.save(novoUsuario);
        clienteRepository.save(novoCliente);

        try {
            emailService.sendPasswordEmail(data.login(), data.name(), senha);
        } catch (Exception e) {
            System.err.println("Erro ao enviar e-mail: " + e.getMessage());
        }

        return ResponseEntity.ok("Usuário cadastrado com sucesso");
    }
}
