package com.minhavitrine.controller;

import com.minhavitrine.model.Usuario;
import com.minhavitrine.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/auth/registro
     * Registra um novo usuário
     */
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody RegistroRequest request) {
        try {
            Usuario usuario = authService.registrar(
                    request.nome,
                    request.email,
                    request.senha,
                    request.telefone,
                    request.tipo != null ? request.tipo : Usuario.TipoUsuario.CLIENTE
            );

            Map<String, Object> response = new HashMap<>();
            response.put("id", usuario.getId());
            response.put("nome", usuario.getNome());
            response.put("email", usuario.getEmail());
            response.put("tipo", usuario.getTipo());
            response.put("mensagem", "Cadastro realizado com sucesso!");

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    /**
     * POST /api/auth/login
     * Faz login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuario = authService.login(request.email, request.senha);

        if (usuario.isPresent()) {
            Usuario u = usuario.get();
            Map<String, Object> response = new HashMap<>();
            response.put("id", u.getId());
            response.put("nome", u.getNome());
            response.put("email", u.getEmail());
            response.put("tipo", u.getTipo());
            response.put("token", "jwt-token-aqui"); // Implementar JWT real depois
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body(Map.of("erro", "E-mail ou senha inválidos"));
    }

    // Classes internas para os requests (DTOs simples)
    static class RegistroRequest {
        public String nome;
        public String email;
        public String senha;
        public String telefone;
        public Usuario.TipoUsuario tipo;
    }

    static class LoginRequest {
        public String email;
        public String senha;
    }
}
