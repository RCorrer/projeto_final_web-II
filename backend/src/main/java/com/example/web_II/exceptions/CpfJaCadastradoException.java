package com.example.web_II.exceptions;

public class CpfJaCadastradoException extends RuntimeException {
    public CpfJaCadastradoException() {
        super("CPF já cadastrado na base de dados. Tente efetuar o login");
    }
}
