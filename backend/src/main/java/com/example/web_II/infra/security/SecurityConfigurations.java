package com.example.web_II.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {
    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable) // Forma mais moderna de desabilitar CSRF
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Habilita CORS
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // Rotas públicas
                        .requestMatchers(HttpMethod.POST,
                                "/login",
                                "/cadastro/cliente"
                        ).permitAll()

                        // Documentação Swagger
                        .requestMatchers(
                                "/v3/api-docs",
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/swagger-resources/**",
                                "/webjars/**"
                        ).permitAll()

                        // Rotas protegidas (Funcionarios)
                        .requestMatchers("/categoria/**").hasRole("FUNCIONARIO")
                        .requestMatchers("/funcionarios").hasRole("FUNCIONARIO")
                        .requestMatchers("/cadastro/funcionario").hasRole("FUNCIONARIO")
                        .requestMatchers("/relatorio/**").hasRole("FUNCIONARIO")
                        .requestMatchers("/solicitacao/redirecionarSolicitacao").hasRole("FUNCIONARIO")
                        .requestMatchers("/solicitacao/capturarSolicitacao").hasRole("FUNCIONARIO")
                        .requestMatchers("/solicitacao/atualizarEstado/orcado").hasRole("FUNCIONARIO")
                        .requestMatchers("/solicitacao/atualizarEstado/finalizada").hasRole("FUNCIONARIO")
                        .requestMatchers("/solicitacao/atualizarEstado/entregue").hasRole("FUNCIONARIO")
                        .requestMatchers("/solicitacao/atualizarEstado/arrumada").hasRole("FUNCIONARIO")

                        // Rotas protegidas (Clientes)
                        .requestMatchers("/solicitacao/criar").hasRole("CLIENTE")
                        .requestMatchers("/solicitacao/atualizarEstado/rejeitar").hasRole("CLIENTE")
                        .requestMatchers("/solicitacao/atualizarEstado/aprovar").hasRole("CLIENTE")
                        .requestMatchers("/solicitacao/atualizarEstado/paga").hasRole("CLIENTE")

                        //separar rota de solicitação por endpoints
                        //o que é de funcionario/cliente ou ambos
                        .requestMatchers("/solicitacao/**").permitAll()

                        // Todas as outras rotas requerem autenticação
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*")); // Permite todas as origens (ajuste para produção)
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}