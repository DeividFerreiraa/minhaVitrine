package com.minhavitrine.service;

import com.minhavitrine.model.Categoria;
import com.minhavitrine.model.Prestador;
import com.minhavitrine.model.Solicitacao;
import com.minhavitrine.model.Usuario;
import com.minhavitrine.repository.CategoriaRepository;
import com.minhavitrine.repository.PrestadorRepository;
import com.minhavitrine.repository.SolicitacaoRepository;
import com.minhavitrine.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SolicitacaoServiceTest {

    @Mock private SolicitacaoRepository solicitacaoRepository;
    @Mock private UsuarioRepository usuarioRepository;
    @Mock private PrestadorRepository prestadorRepository;
    @Mock private CategoriaRepository categoriaRepository;

    @InjectMocks
    private SolicitacaoService solicitacaoService;

    private Usuario criarUsuario(Long id) {
        Usuario u = new Usuario();
        u.setId(id);
        return u;
    }

    private Prestador criarPrestador(Long id) {
        Prestador p = new Prestador();
        p.setId(id);
        p.setUsuario(criarUsuario(id + 100L));
        return p;
    }

    private Categoria criarCategoria(Long id) {
        Categoria c = new Categoria();
        c.setId(id);
        c.setNome("Pedreiro");
        return c;
    }

    @Test
    void criar_deveCriarSolicitacao_quandoDadosValidos() {
        Usuario cliente = criarUsuario(1L);
        Prestador prestador = criarPrestador(2L);
        Categoria categoria = criarCategoria(3L);

        Solicitacao salva = new Solicitacao();
        salva.setId(10L);
        salva.setCliente(cliente);
        salva.setPrestador(prestador);
        salva.setCategoria(categoria);
        salva.setTitulo("Reforma do banheiro");

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(cliente));
        when(prestadorRepository.findById(2L)).thenReturn(Optional.of(prestador));
        when(categoriaRepository.findById(3L)).thenReturn(Optional.of(categoria));
        when(solicitacaoRepository.save(any())).thenReturn(salva);

        Solicitacao result = solicitacaoService.criar(
                1L, 2L, 3L,
                "Reforma do banheiro", "Trocar azulejos",
                "Rua A, 10", LocalDate.of(2026, 3, 20));

        assertThat(result.getId()).isEqualTo(10L);
        assertThat(result.getTitulo()).isEqualTo("Reforma do banheiro");
        verify(solicitacaoRepository).save(any(Solicitacao.class));
    }

    @Test
    void criar_deveLancarExcecao_quandoClienteNaoEncontrado() {
        when(usuarioRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                solicitacaoService.criar(99L, 1L, 1L, "titulo", "desc", "end", LocalDate.now()))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Cliente não encontrado");
    }

    @Test
    void criar_deveLancarExcecao_quandoPrestadorNaoEncontrado() {
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(criarUsuario(1L)));
        when(prestadorRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                solicitacaoService.criar(1L, 99L, 1L, "titulo", "desc", "end", LocalDate.now()))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Prestador não encontrado");
    }

    @Test
    void criar_deveLancarExcecao_quandoCategoriaInexistente() {
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(criarUsuario(1L)));
        when(prestadorRepository.findById(2L)).thenReturn(Optional.of(criarPrestador(2L)));
        when(categoriaRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                solicitacaoService.criar(1L, 2L, 99L, "titulo", "desc", "end", LocalDate.now()))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Categoria não encontrada");
    }

    @Test
    void atualizarStatus_deveAlterarStatus_quandoSolicitacaoExiste() {
        Solicitacao solicitacao = new Solicitacao();
        solicitacao.setId(1L);
        solicitacao.setStatus(Solicitacao.StatusSolicitacao.PENDENTE);
        solicitacao.setCliente(criarUsuario(1L));
        solicitacao.setPrestador(criarPrestador(2L));
        solicitacao.setCategoria(criarCategoria(3L));

        when(solicitacaoRepository.findById(1L)).thenReturn(Optional.of(solicitacao));
        when(solicitacaoRepository.save(any())).thenReturn(solicitacao);

        Solicitacao result = solicitacaoService.atualizarStatus(1L, Solicitacao.StatusSolicitacao.ACEITO);

        assertThat(result.getStatus()).isEqualTo(Solicitacao.StatusSolicitacao.ACEITO);
        verify(solicitacaoRepository).save(solicitacao);
    }

    @Test
    void atualizarStatus_deveLancarExcecao_quandoNaoEncontrada() {
        when(solicitacaoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                solicitacaoService.atualizarStatus(99L, Solicitacao.StatusSolicitacao.ACEITO))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Solicitação não encontrada");
    }

    @Test
    void atualizarStatus_deveAtualizarCampoAtualizadoEm() {
        Solicitacao solicitacao = new Solicitacao();
        solicitacao.setId(1L);
        solicitacao.setStatus(Solicitacao.StatusSolicitacao.PENDENTE);

        when(solicitacaoRepository.findById(1L)).thenReturn(Optional.of(solicitacao));
        when(solicitacaoRepository.save(any())).thenReturn(solicitacao);

        solicitacaoService.atualizarStatus(1L, Solicitacao.StatusSolicitacao.EM_ANDAMENTO);

        assertThat(solicitacao.getAtualizadoEm()).isNotNull();
    }

    @Test
    void listarPorCliente_deveRetornarListaOrdenada() {
        List<Solicitacao> lista = List.of(new Solicitacao(), new Solicitacao());
        when(solicitacaoRepository.findByClienteIdOrderByCriadoEmDesc(1L)).thenReturn(lista);

        List<Solicitacao> result = solicitacaoService.listarPorCliente(1L);

        assertThat(result).hasSize(2);
        verify(solicitacaoRepository).findByClienteIdOrderByCriadoEmDesc(1L);
    }

    @Test
    void listarPorPrestador_deveRetornarLista() {
        List<Solicitacao> lista = List.of(new Solicitacao());
        when(solicitacaoRepository.findByPrestadorIdOrderByCriadoEmDesc(2L)).thenReturn(lista);

        List<Solicitacao> result = solicitacaoService.listarPorPrestador(2L);

        assertThat(result).hasSize(1);
        verify(solicitacaoRepository).findByPrestadorIdOrderByCriadoEmDesc(2L);
    }
}
