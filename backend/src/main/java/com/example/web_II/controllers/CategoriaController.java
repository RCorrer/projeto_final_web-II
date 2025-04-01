package com.example.web_II.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("/categoria")
public class CategoriaController {

    // GET /categoria
    @GetMapping()
    public String helloWorld() {
        return "Hello World";
    }


}
