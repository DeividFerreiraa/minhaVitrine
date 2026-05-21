package com.minhavitrine.service;

import com.minhavitrine.model.Usuario;
import com.minhavitrine.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Registra um novo usuário
     */
    public Usuario registrar(String nome, String email, String senha, String telefone, Usuario.TipoUsuario tipo) {
        // Verifica se e-mail já existe
        if (usuarioRepository.existsByEmail(email)) {
            throw new RuntimeException("E-mail já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(passwordEncoder.encode(senha)); // Criptografa a senha
        usuario.setTelefone(telefone);
        usuario.setTipo(tipo);

        return usuarioRepository.save(usuario);
    }

    /**
     * Faz login e retorna o usuário se credenciais válidas
     */
    public Optional<Usuario> login(String email, String senha) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        if (usuario.isPresent() && passwordEncoder.matches(senha, usuario.get().getSenha())) {
            return usuario;
        }

        return Optional.empty();
    }
}
