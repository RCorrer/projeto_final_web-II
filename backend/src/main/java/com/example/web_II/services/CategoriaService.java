package com.example.web_II.services;


import com.example.web_II.domain.categoria.Categoria;
import com.example.web_II.domain.categoria.CategoriaDTO;
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

    public ResponseEntity<String> addCategoryResponse(CategoriaDTO data){
        if (categoriaRepository.existsByDescricao(data.descricao())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("A categoria "+ data.descricao() + " já existe!!");
        }
        Categoria novaCategoria = new Categoria(data.descricao());
        this.categoriaRepository.save(novaCategoria);

        var nomeCategoria = data.descricao();
        return ResponseEntity.ok("Categoria " + nomeCategoria + " adicionada!!");
    }

    public ResponseEntity<List<String>> listCategoryResponse (){
        List<Categoria> categorias = categoriaRepository.findAll();
        List<String> descricoes = new ArrayList<>();

        for (Categoria categoria : categorias){
            descricoes.add(categoria.getDescricao());
        }

        return ResponseEntity.ok(descricoes);
    }

    public ResponseEntity<String> deleteCategoryResponse(String descricao){
        if (categoriaRepository.existsByDescricao(descricao)){
            Optional<Categoria> categoria = categoriaRepository.findByDescricao(descricao);

            categoriaRepository.delete(categoria.get());
            return ResponseEntity.ok("Categoria " + categoria.get().getDescricao() + " removida com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria " + descricao + " não existe no sistema");
        }
    }

    public ResponseEntity<String> editarCategoria(String descricao, CategoriaDTO data) {
        if (categoriaRepository.existsByDescricao(descricao)) {
            String antigoNome = descricao;
            Optional<Categoria> categoriaTemp = categoriaRepository.findByDescricao(descricao);
            Categoria categoria = categoriaTemp.get();
            categoria.setDescricao(data.descricao());
            categoriaRepository.save(categoria);
            return ResponseEntity.ok("Categoria Editada com sucesso!! \n Antigo nome: " + antigoNome + "\n Nome novo: " +data.descricao() + "\n");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria" + descricao + "não existe!!");
        }
    }

}
