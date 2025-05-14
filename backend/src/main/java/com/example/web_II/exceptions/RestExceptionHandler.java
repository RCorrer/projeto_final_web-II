package com.example.web_II.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;



@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {



    @ExceptionHandler(EmailJaCadastradoException.class)
    private ResponseEntity<String> emailJaCadastradoHandler(EmailJaCadastradoException exception){
        return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body("Este email já existe");
    }

    

}
