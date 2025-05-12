package com.example.web_II.services;

import com.example.web_II.domain.funcionarios.Funcionario;
import com.example.web_II.domain.funcionarios.FuncionarioAtualizacaoDTO;
import com.example.web_II.domain.funcionarios.FuncionarioListagemDTO;
import com.example.web_II.domain.usuarios.Usuario;
import com.example.web_II.repositories.FuncionarioRepository;
import com.example.web_II.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class FuncionarioService {

    @Autowired
    FuncionarioRepository funcionarioRepository;
    @Autowired
    UsuarioRepository usuarioRepository;

    public Page<FuncionarioListagemDTO> listarTodosFuncionarios(Pageable pageable) {
        return funcionarioRepository.findAll(pageable)
                .map(FuncionarioListagemDTO::new);
    }

    @Transactional(readOnly = true)
    public Optional<String> getNomeFuncionarioById(String funcionarioId) {
        return funcionarioRepository.findById(funcionarioId)
                .map(funcionario -> funcionario.getUsuario().getNome());
    }

    @Transactional
    public void deletarFuncionario(String id) {
        funcionarioRepository.findById(id).ifPresent(funcionario -> {
            funcionarioRepository.delete(funcionario);
            usuarioRepository.delete(funcionario.getUsuario());
        });
    }

    @Transactional
    public FuncionarioListagemDTO atualizarFuncionario(FuncionarioAtualizacaoDTO data) {

        Funcionario funcionario = funcionarioRepository.findById(data.id())
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        Usuario usuario = funcionario.getUsuario();
        if (data.nome() != null) usuario.setNome(data.nome());
        if (data.email() != null) usuario.setEmail(data.email());
        if (data.senha() != null) usuario.setSenha(data.senha());
        if (data.role() != null) usuario.setRole(data.role());

        if (data.nascimento() != null) funcionario.setNascimento(data.nascimento());

        usuarioRepository.save(usuario);
        funcionarioRepository.save(funcionario);

        return new FuncionarioListagemDTO(funcionario);
    }


}