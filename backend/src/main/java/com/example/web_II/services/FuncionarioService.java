package com.example.web_II.services;

import com.example.web_II.domain.funcionarios.FuncionarioListagemDTO;
import com.example.web_II.repositories.FuncionarioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
}