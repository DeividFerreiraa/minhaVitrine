package com.minhavitrine.service;

import com.minhavitrine.model.Categoria;
import com.minhavitrine.model.Prestador;
import com.minhavitrine.model.Usuario;
import com.minhavitrine.repository.CategoriaRepository;
import com.minhavitrine.repository.PrestadorRepository;
import com.minhavitrine.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PrestadorServiceTest {

    @Mock private PrestadorRepository prestadorRepository;
    @Mock private UsuarioRepository usuarioRepository;
    @Mock private CategoriaRepository categoriaRepository;

    @InjectMocks
    private PrestadorService prestadorService;

    private Usuario criarUsuario(Long id) {
        Usuario u = new Usuario();
        u.setId(id);
        u.setNome("Usuario " + id);
        u.setEmail("usuario" + id + "@email.com");
        u.setTipo(Usuario.TipoUsuario.CLIENTE);
        return u;
    }

    private Categoria criarCategoria(Long id, String nome) {
        Categoria c = new Categoria();
        c.setId(id);
        c.setNome(nome);
        return c;
    }

    @Test
    void cadastrar_deveCriarPrestador_quandoDadosValidos() {
        Usuario usuario = criarUsuario(1L);
        Categoria categoria = criarCategoria(10L, "Pedreiro");

        Prestador prestadorSalvo = new Prestador();
        prestadorSalvo.setId(1L);
        prestadorSalvo.setUsuario(usuario);

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(usuarioRepository.save(any())).thenReturn(usuario);
        when(categoriaRepository.findById(10L)).thenReturn(Optional.of(categoria));
        when(prestadorRepository.save(any(Prestador.class))).thenReturn(prestadorSalvo);

        Prestador result = prestadorService.cadastrar(
                1L, "Especialista em alvenaria",
                new BigDecimal("200.00"), "por dia",
                "Sao Paulo", "SP", Set.of(10L));

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(usuario.getTipo()).isEqualTo(Usuario.TipoUsuario.PRESTADOR);
        verify(prestadorRepository).save(any(Prestador.class));
    }

    @Test
    void cadastrar_deveLancarExcecao_quandoUsuarioNaoEncontrado() {
        when(usuarioRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                prestadorService.cadastrar(99L, "desc", BigDecimal.TEN, "por dia", "SP", "SP", Set.of()))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Usuário não encontrado");
    }

    @Test
    void cadastrar_deveLancarExcecao_quandoCategoriaInexistente() {
        Usuario usuario = criarUsuario(1L);
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(usuarioRepository.save(any())).thenReturn(usuario);
        when(categoriaRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                prestadorService.cadastrar(1L, "desc", BigDecimal.TEN, "por dia", "SP", "SP", Set.of(99L)))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Categoria não encontrada");
    }

    @Test
    void buscar_deveRetornarPorCategoria_quandoApenasCategoria() {
        List<Prestador> esperado = List.of(new Prestador());
        when(prestadorRepository.findByCategoria("Eletricista")).thenReturn(esperado);

        List<Prestador> result = prestadorService.buscar("Eletricista", null);

        assertThat(result).hasSize(1);
        verify(prestadorRepository).findByCategoria("Eletricista");
        verify(prestadorRepository, never()).findByCidade(any());
    }

    @Test
    void buscar_deveRetornarPorCidade_quandoApenasCidade() {
        List<Prestador> esperado = List.of(new Prestador(), new Prestador());
        when(prestadorRepository.findByCidade("Campinas")).thenReturn(esperado);

        List<Prestador> result = prestadorService.buscar(null, "Campinas");

        assertThat(result).hasSize(2);
        verify(prestadorRepository).findByCidade("Campinas");
    }

    @Test
    void buscar_deveRetornarPorCidadeECategoria_quandoAmbosFornecidos() {
        List<Prestador> esperado = List.of(new Prestador());
        when(prestadorRepository.findByCidadeAndCategoria("Sao Paulo", "Pintor")).thenReturn(esperado);

        List<Prestador> result = prestadorService.buscar("Pintor", "Sao Paulo");

        assertThat(result).hasSize(1);
        verify(prestadorRepository).findByCidadeAndCategoria("Sao Paulo", "Pintor");
    }

    @Test
    void buscar_deveRetornarTop10_quandoSemFiltros() {
        List<Prestador> esperado = List.of(new Prestador());
        when(prestadorRepository.findTop10ByOrderByNotaMediaDesc()).thenReturn(esperado);

        List<Prestador> result = prestadorService.buscar(null, null);

        assertThat(result).hasSize(1);
        verify(prestadorRepository).findTop10ByOrderByNotaMediaDesc();
    }

    @Test
    void buscarPorId_deveRetornarPrestador_quandoEncontrado() {
        Prestador prestador = new Prestador();
        prestador.setId(1L);
        when(prestadorRepository.findById(1L)).thenReturn(Optional.of(prestador));

        Prestador result = prestadorService.buscarPorId(1L);

        assertThat(result.getId()).isEqualTo(1L);
    }

    @Test
    void buscarPorId_deveLancarExcecao_quandoNaoEncontrado() {
        when(prestadorRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> prestadorService.buscarPorId(99L))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Prestador não encontrado");
    }
}
