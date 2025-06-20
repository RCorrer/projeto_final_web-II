package com.example.web_II.exceptions;

public class ClienteNaoEncontradoException extends RuntimeException{
    public ClienteNaoEncontradoException(){super("Cliente não encontrado no sistema");}
}
