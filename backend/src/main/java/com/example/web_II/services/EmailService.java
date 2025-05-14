package com.example.web_II.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordEmail(String toEmail, String nome, String senha) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("BipBipConsertos@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Bem-vindo ao BipBip Consertos - Sua senha de acesso");

        String emailContent = String.format(
                "Olá %s,\n\n" +
                        "Agradecemos por se cadastrar em nosso sistema!\n\n" +
                        "Aqui está a sua senha de acesso: %s\n\n" +
                        "Atenciosamente,\n" +
                        "Equipe BipBip Consertos", nome, senha);

        message.setText(emailContent);

        mailSender.send(message);
    }
}