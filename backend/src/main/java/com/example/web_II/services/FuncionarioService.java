package com.example.web_II.services;

import com.example.web_II.domain.funcionarios.FuncionarioListagemDTO;
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
}