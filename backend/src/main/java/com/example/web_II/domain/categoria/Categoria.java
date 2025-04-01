package com.example.web_II.domain.categoria;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "CategoriaEquipamento")
@Entity
@EqualsAndHashCode(of = "id")
@Getter
@Setter
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String descricao;
    public  Categoria (String descricao){
        this.descricao = descricao;
    }

}
