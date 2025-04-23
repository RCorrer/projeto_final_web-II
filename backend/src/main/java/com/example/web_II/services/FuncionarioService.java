package com.example.web_II.services;

import com.example.web_II.domain.funcionarios.FuncionarioListagemDTO;
import com.example.web_II.repositories.FuncionarioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    public Page<FuncionarioListagemDTO> listarTodosFuncionarios(Pageable pageable) {
        return funcionarioRepository.findAll(pageable)
                .map(FuncionarioListagemDTO::new);
    }

    @Transactional(readOnly = true)
    public Optional<String> getNomeFuncionarioById(String funcionarioId) {
        return funcionarioRepository.findById(funcionarioId)
                .map(funcionario -> funcionario.getUsuario().getNome());
    }
}