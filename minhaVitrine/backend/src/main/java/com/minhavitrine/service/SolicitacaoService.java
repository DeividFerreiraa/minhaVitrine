package com.minhavitrine.service;

import com.minhavitrine.model.Categoria;
import com.minhavitrine.model.Prestador;
import com.minhavitrine.model.Solicitacao;
import com.minhavitrine.model.Usuario;
import com.minhavitrine.repository.CategoriaRepository;
import com.minhavitrine.repository.PrestadorRepository;
import com.minhavitrine.repository.SolicitacaoRepository;
import com.minhavitrine.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SolicitacaoService {

    private final SolicitacaoRepository solicitacaoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PrestadorRepository prestadorRepository;
    private final CategoriaRepository categoriaRepository;

    /**
     * Cria uma nova solicitação de serviço
     */
    @Transactional
    public Solicitacao criar(Long clienteId, Long prestadorId, Long categoriaId,
                             String titulo, String descricao, String endereco,
                             LocalDate dataPreferida) {

        Usuario cliente = usuarioRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        Prestador prestador = prestadorRepository.findById(prestadorId)
                .orElseThrow(() -> new RuntimeException("Prestador não encontrado"));
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Solicitacao solicitacao = new Solicitacao();
        solicitacao.setCliente(cliente);
        solicitacao.setPrestador(prestador);
        solicitacao.setCategoria(categoria);
        solicitacao.setTitulo(titulo);
        solicitacao.setDescricao(descricao);
        solicitacao.setEndereco(endereco);
        solicitacao.setDataPreferida(dataPreferida);

        return solicitacaoRepository.save(solicitacao);
    }

    /**
     * Atualiza o status de uma solicitação
     */
    @Transactional
    public Solicitacao atualizarStatus(Long solicitacaoId, Solicitacao.StatusSolicitacao novoStatus) {
        Solicitacao solicitacao = solicitacaoRepository.findById(solicitacaoId)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        solicitacao.setStatus(novoStatus);
        solicitacao.setAtualizadoEm(LocalDateTime.now());

        return solicitacaoRepository.save(solicitacao);
    }

    /**
     * Lista solicitações do cliente
     */
    public List<Solicitacao> listarPorCliente(Long clienteId) {
        return solicitacaoRepository.findByClienteIdOrderByCriadoEmDesc(clienteId);
    }

    /**
     * Lista solicitações do prestador
     */
    public List<Solicitacao> listarPorPrestador(Long prestadorId) {
        return solicitacaoRepository.findByPrestadorIdOrderByCriadoEmDesc(prestadorId);
    }
}
