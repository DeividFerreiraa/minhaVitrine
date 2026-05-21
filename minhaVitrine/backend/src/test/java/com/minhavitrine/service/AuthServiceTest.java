package com.minhavitrine.service;

import com.minhavitrine.model.Usuario;
import com.minhavitrine.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void registrar_deveRetornarUsuario_quandoDadosValidos() {
        when(usuarioRepository.existsByEmail("joao@email.com")).thenReturn(false);
        when(passwordEncoder.encode("senha123")).thenReturn("senha_hash");

        Usuario salvo = new Usuario();
        salvo.setId(1L);
        salvo.setNome("Joao");
        salvo.setEmail("joao@email.com");
        salvo.setSenha("senha_hash");
        salvo.setTipo(Usuario.TipoUsuario.CLIENTE);
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(salvo);

        Usuario result = authService.registrar("Joao", "joao@email.com", "senha123", "11999999999", Usuario.TipoUsuario.CLIENTE);

        assertThat(result).isNotNull();
        assertThat(result.getNome()).isEqualTo("Joao");
        assertThat(result.getEmail()).isEqualTo("joao@email.com");
        verify(passwordEncoder).encode("senha123");
        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    void registrar_deveLancarExcecao_quandoEmailJaCadastrado() {
        when(usuarioRepository.existsByEmail("existente@email.com")).thenReturn(true);

        assertThatThrownBy(() ->
                authService.registrar("Ana", "existente@email.com", "senha", null, Usuario.TipoUsuario.CLIENTE))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("E-mail já cadastrado");

        verify(usuarioRepository, never()).save(any());
    }

    @Test
    void login_deveRetornarUsuario_quandoCredenciaisValidas() {
        Usuario usuario = new Usuario();
        usuario.setEmail("joao@email.com");
        usuario.setSenha("senha_hash");

        when(usuarioRepository.findByEmail("joao@email.com")).thenReturn(Optional.of(usuario));
        when(passwordEncoder.matches("senha123", "senha_hash")).thenReturn(true);

        Optional<Usuario> result = authService.login("joao@email.com", "senha123");

        assertThat(result).isPresent();
        assertThat(result.get().getEmail()).isEqualTo("joao@email.com");
    }

    @Test
    void login_deveRetornarEmpty_quandoSenhaInvalida() {
        Usuario usuario = new Usuario();
        usuario.setEmail("joao@email.com");
        usuario.setSenha("senha_hash");

        when(usuarioRepository.findByEmail("joao@email.com")).thenReturn(Optional.of(usuario));
        when(passwordEncoder.matches("senha_errada", "senha_hash")).thenReturn(false);

        Optional<Usuario> result = authService.login("joao@email.com", "senha_errada");

        assertThat(result).isEmpty();
    }

    @Test
    void login_deveRetornarEmpty_quandoEmailNaoEncontrado() {
        when(usuarioRepository.findByEmail("naoexiste@email.com")).thenReturn(Optional.empty());

        Optional<Usuario> result = authService.login("naoexiste@email.com", "qualquersenha");

        assertThat(result).isEmpty();
    }

    @Test
    void registrar_deveCriptografarSenhaAntesDesSalvar() {
        when(usuarioRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode("senhaPlana")).thenReturn("$2a$10$hash");

        Usuario salvo = new Usuario();
        salvo.setSenha("$2a$10$hash");
        when(usuarioRepository.save(any())).thenReturn(salvo);

        authService.registrar("Test", "test@email.com", "senhaPlana", null, Usuario.TipoUsuario.CLIENTE);

        verify(passwordEncoder).encode("senhaPlana");
        verify(usuarioRepository).save(argThat(u -> "$2a$10$hash".equals(u.getSenha())));
    }

    @Test
    void registrar_deveDefinirTipoCorreto_quandoPrestador() {
        when(usuarioRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(any())).thenReturn("hash");

        Usuario salvo = new Usuario();
        salvo.setTipo(Usuario.TipoUsuario.PRESTADOR);
        when(usuarioRepository.save(any())).thenReturn(salvo);

        Usuario result = authService.registrar("Carlos", "carlos@email.com", "senha", "11999999999", Usuario.TipoUsuario.PRESTADOR);

        assertThat(result.getTipo()).isEqualTo(Usuario.TipoUsuario.PRESTADOR);
    }
}
