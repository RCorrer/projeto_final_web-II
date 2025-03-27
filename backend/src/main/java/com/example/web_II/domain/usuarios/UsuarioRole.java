package com.example.web_II.domain.usuarios;

public enum UsuarioRole {
    FUNCIONARIO("funcionario"),
    CLIENTE("cliente");

    private String role;

    UsuarioRole(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
