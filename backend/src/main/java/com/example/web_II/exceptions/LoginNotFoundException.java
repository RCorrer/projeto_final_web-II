package com.example.web_II.exceptions;

public class LoginNotFoundException extends RuntimeException {
    public LoginNotFoundException() { super("Usuário não cadastrado no sistema");}
}
