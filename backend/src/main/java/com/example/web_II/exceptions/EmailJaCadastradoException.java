package com.example.web_II.exceptions;

public class EmailJaCadastradoException extends RuntimeException {
    public EmailJaCadastradoException() {
        super("Email já cadastrado na base de dados. Tente efetuar o login");
    }
}
