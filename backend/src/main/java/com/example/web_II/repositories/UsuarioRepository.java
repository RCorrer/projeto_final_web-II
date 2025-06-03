package com.example.web_II.repositories;

import com.example.web_II.domain.usuarios.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    UserDetails findUserDetailsByEmail(String email);
    Usuario findByEmail(String email);
}
