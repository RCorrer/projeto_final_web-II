package com.example.web_II.services;

import com.example.web_II.domain.categoria.Categoria;
import com.example.web_II.domain.categoria.CategoriaDTO;
import com.example.web_II.exceptions.CategoriaInexistenteException;
import com.example.web_II.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public ResponseEntity<String> addCategoryResponse(CategoriaDTO data) {
        Optional<Categoria> categoriaExistente = categoriaRepository.findByDescricao(data.descricao());

        if (categoriaExistente.isPresent()) {
            // Se a categoria existe, verifica se está inativa para reativá-la
            Categoria categoria = categoriaExistente.get();
            if (!categoria.isAtiva()) {
                categoria.setAtiva(true);
                categoriaRepository.save(categoria);
                return ResponseEntity.ok("Categoria " + data.descricao() + " reativada!");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Categoria " + data.descricao() + " já existe!");
            }
        }

        Categoria novaCategoria = new Categoria(data.descricao());
        this.categoriaRepository.save(novaCategoria);
        return ResponseEntity.ok("Categoria " + data.descricao() + " adicionada!");
    }

    public ResponseEntity<List<String>> listCategoryResponse() {
        List<Categoria> categorias = categoriaRepository.findByAtivaTrue();
        List<String> descricoes = new ArrayList<>();

        for (Categoria categoria : categorias) {
            descricoes.add(categoria.getDescricao());
        }
        return ResponseEntity.ok(descricoes);
    }

    public ResponseEntity<String> deleteCategoryResponse(String descricao) {
        Optional<Categoria> categoriaOpt = categoriaRepository.findByDescricao(descricao);

        if (categoriaOpt.isPresent()) {
            Categoria categoria = categoriaOpt.get();
            categoria.setAtiva(false);
            categoriaRepository.save(categoria);
            return ResponseEntity.ok("Categoria " + descricao + " desativada com sucesso!");
        } else {
            throw new CategoriaInexistenteException();
        }
    }

    public ResponseEntity<String> editarCategoria(String descricao, CategoriaDTO data) {
        Optional<Categoria> categoriaOpt = categoriaRepository.findByDescricao(descricao);

        if (categoriaOpt.isPresent()) {
            Categoria categoria = categoriaOpt.get();

            Optional<Categoria> categoriaComNovaDescricao = categoriaRepository.findByDescricao(data.descricao());
            if (categoriaComNovaDescricao.isPresent() &&
                    !categoriaComNovaDescricao.get().getId().equals(categoria.getId())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Já existe uma categoria ativa com esta descrição");
            }

            String antigoNome = categoria.getDescricao();
            categoria.setDescricao(data.descricao());
            categoriaRepository.save(categoria);

            return ResponseEntity.ok("Categoria Editada com sucesso!! \n" +
                    "Antigo nome: " + antigoNome + "\n" +
                    "Nome novo: " + data.descricao() + "\n");
        } else {
            throw new CategoriaInexistenteException();
        }
    }
}