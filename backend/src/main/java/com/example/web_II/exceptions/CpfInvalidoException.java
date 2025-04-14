package com.example.web_II.exceptions;

public class CpfInvalidoException extends RuntimeException {
    public CpfInvalidoException() {
        super("CPF inválido");
    }
}
