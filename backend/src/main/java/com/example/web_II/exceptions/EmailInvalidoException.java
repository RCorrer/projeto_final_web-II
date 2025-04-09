package com.example.web_II.exceptions;

public class EmailInvalidoException extends RuntimeException {
    public EmailInvalidoException() {
        super("E-mail inválido");
    }
}
