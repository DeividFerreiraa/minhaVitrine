package com.minhavitrine.service;

import com.minhavitrine.model.Categoria;
import com.minhavitrine.model.Prestador;
import com.minhavitrine.model.Usuario;
import com.minhavitrine.repository.CategoriaRepository;
import com.minhavitrine.repository.PrestadorRepository;
import com.minhavitrine.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PrestadorService {

    private final PrestadorRepository prestadorRepository;
    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;

    /**
     * Cadastra um novo prestador de serviço
     */
    @Transactional
    public Prestador cadastrar(Long usuarioId, String descricao, BigDecimal preco,
                                String tipoPreco, String cidade, String estado,
                                Set<Long> categoriaIds) {

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Atualiza o tipo para PRESTADOR
        usuario.setTipo(Usuario.TipoUsuario.PRESTADOR);
        usuarioRepository.save(usuario);

        Prestador prestador = new Prestador();
        prestador.setUsuario(usuario);
        prestador.setDescricao(descricao);
        prestador.setPrecoReferencia(preco);
        prestador.setTipoPreco(tipoPreco);
        prestador.setCidade(cidade);
        prestador.setEstado(estado);

        // Vincula as categorias
        for (Long catId : categoriaIds) {
            Categoria categoria = categoriaRepository.findById(catId)
                    .orElseThrow(() -> new RuntimeException("Categoria não encontrada: " + catId));
            prestador.getCategorias().add(categoria);
        }

        return prestadorRepository.save(prestador);
    }

    /**
     * Busca prestadores com filtros opcionais
     */
    public List<Prestador> buscar(String categoria, String cidade) {
        if (categoria != null && cidade != null) {
            return prestadorRepository.findByCidadeAndCategoria(cidade, categoria);
        } else if (categoria != null) {
            return prestadorRepository.findByCategoria(categoria);
        } else if (cidade != null) {
            return prestadorRepository.findByCidade(cidade);
        }
        return prestadorRepository.findTop10ByOrderByNotaMediaDesc();
    }

    /**
     * Busca prestador por ID
     */
    public Prestador buscarPorId(Long id) {
        return prestadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prestador não encontrado"));
    }
}
