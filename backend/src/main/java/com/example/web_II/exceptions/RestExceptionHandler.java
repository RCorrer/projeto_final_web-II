package com.example.web_II.exceptions;

import com.example.web_II.domain.geral.RespostaPadraoDTO;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.springframework.core.StandardReflectionParameterNameDiscoverer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@RestControllerAdvice
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {


// USUARIOS


    @ExceptionHandler(LoginNotFoundException.class)
    private ResponseEntity<RespostaPadraoDTO> loginHandler (LoginNotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RespostaPadraoDTO(
                HttpStatus.NOT_FOUND.toString(), ex.getMessage()
        ));
    }

    @ExceptionHandler(EmailJaCadastradoException.class)
    private ResponseEntity<RespostaPadraoDTO> emailJaCadastradoHandler(EmailJaCadastradoException exception){
        return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(
                new RespostaPadraoDTO(HttpStatus.PRECONDITION_FAILED.toString(), "Email e/ou CPF já cadastrados")
        );
    }

    @ExceptionHandler(CpfJaCadastradoException.class)
    private ResponseEntity<RespostaPadraoDTO> cpfJaCadastradoHandler(CpfJaCadastradoException exception){
        return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(
                new RespostaPadraoDTO(HttpStatus.PRECONDITION_FAILED.toString(), "Emai e/ou CPF já cadastrados")
        );
    }


    @ExceptionHandler(FuncionarioNaoEncontradoException.class)
    private ResponseEntity<RespostaPadraoDTO> funcionarioNaoEncontradoHandler (FuncionarioNaoEncontradoException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new RespostaPadraoDTO(HttpStatus.NOT_FOUND.toString(), ex.getMessage())
        );
    }

    @ExceptionHandler(ClienteNaoEncontradoException.class)
    private ResponseEntity<RespostaPadraoDTO> clienteNaoEncontradoHandler (ClienteNaoEncontradoException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new RespostaPadraoDTO(HttpStatus.NOT_FOUND.toString(), ex.getMessage())
        );
    }

    @ExceptionHandler(FuncionarioAutodeleteException.class)
    private ResponseEntity<RespostaPadraoDTO> funcionarioAutodeleteHandler (FuncionarioAutodeleteException ex){
        return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(new RespostaPadraoDTO(
                HttpStatus.PRECONDITION_FAILED.toString(), ex.getMessage())
        );
    }


    //CATEGORIAS


    @ExceptionHandler(CategoriaJaExisteException.class)
    private ResponseEntity<RespostaPadraoDTO> categoriaJaExistenteHandler(CategoriaJaExisteException exception){
        return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(
                new RespostaPadraoDTO(HttpStatus.PRECONDITION_FAILED.toString(), exception.getMessage())
        );
    }

    @ExceptionHandler(CategoriaInexistenteException.class)
    private ResponseEntity<RespostaPadraoDTO> categoriaInexistenteHandler(CategoriaInexistenteException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new RespostaPadraoDTO(HttpStatus.NOT_FOUND.toString(), exception.getMessage())
        );
    }


    // SOLICITACOES

    @ExceptionHandler(SolicitacaoInexistente.class)
    private ResponseEntity<RespostaPadraoDTO> solicitacaoInexistenteHandler (SolicitacaoInexistente ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RespostaPadraoDTO(
                HttpStatus.NOT_FOUND.toString(), ex.getMessage()
        ));
    }

    @ExceptionHandler(FalhaPegarSolicitacao.class)
    private ResponseEntity<RespostaPadraoDTO> falhaPegarSolicitacaoHandler (FalhaPegarSolicitacao ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RespostaPadraoDTO(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(), ex.getMessage()
        ));
    }

    @ExceptionHandler(SolicitacaoAtualizarInvalido.class)
    private ResponseEntity<RespostaPadraoDTO> atualizacaoEstadoInvalidaHandler (SolicitacaoAtualizarInvalido ex){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new RespostaPadraoDTO(
            HttpStatus.CONFLICT.toString(), ex.getMessage()
        ));
    }

}
