package com.example.web_II.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApplicationResourceAdvice {


    @ExceptionHandler(CpfJaCadastradoException.class)
    @ResponseStatus(HttpStatus.PRECONDITION_FAILED)
    public ApiError handleCpfJaCadastradoException(CpfJaCadastradoException exception){
        return new ApiError(exception.getMessage());
    }

}
