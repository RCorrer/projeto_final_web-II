package com.example.web_II.exceptions;

public class LoginNotFoundException extends RuntimeException {
    public LoginNotFoundException() { super("Email/Senha Inválidos");}
}
