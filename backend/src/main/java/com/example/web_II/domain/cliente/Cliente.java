package com.example.web_II.domain.cliente;

import com.example.web_II.domain.enderecos.Endereco;
import com.example.web_II.domain.usuarios.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Random;


@Table(name = "Clientes")
@Entity(name = "Cliente")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String cpf;
    private String telefone;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_endereco", referencedColumnName = "id", nullable = false)
    private Endereco endereco;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_usuario", nullable = false)
    private Usuario usuario;

    public Cliente(String cpf, String telefone, Endereco endereco, Usuario usuario){
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
    }

    public static String gerarSenha() {
        Random random = new Random();
        int senha = random.nextInt(10000);
        return String.format("%04d", senha);
    }
}
