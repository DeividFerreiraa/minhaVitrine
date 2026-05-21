package com.minhavitrine.controller;

import com.minhavitrine.model.Prestador;
import com.minhavitrine.service.PrestadorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/prestadores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PrestadorController {

    private final PrestadorService prestadorService;

    /**
     * GET /api/prestadores?categoria=Pedreiro&cidade=São Paulo
     * Busca prestadores com filtros opcionais
     */
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> buscar(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String cidade) {

        List<Prestador> prestadores = prestadorService.buscar(categoria, cidade);

        List<Map<String, Object>> response = prestadores.stream()
                .map(this::toMap)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/prestadores/{id}
     * Busca detalhes de um prestador
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Prestador prestador = prestadorService.buscarPorId(id);
            return ResponseEntity.ok(toMap(prestador));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * POST /api/prestadores
     * Cadastra um novo prestador
     */
    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody CadastroRequest request) {
        try {
            Prestador prestador = prestadorService.cadastrar(
                    request.usuarioId,
                    request.descricao,
                    request.preco,
                    request.tipoPreco,
                    request.cidade,
                    request.estado,
                    request.categoriaIds
            );
            return ResponseEntity.ok(toMap(prestador));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    // Converte Prestador para Map (resposta da API)
    private Map<String, Object> toMap(Prestador p) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", p.getId());
        map.put("nome", p.getUsuario().getNome());
        map.put("email", p.getUsuario().getEmail());
        map.put("telefone", p.getUsuario().getTelefone());
        map.put("fotoUrl", p.getUsuario().getFotoUrl());
        map.put("descricao", p.getDescricao());
        map.put("precoReferencia", p.getPrecoReferencia());
        map.put("tipoPreco", p.getTipoPreco());
        map.put("cidade", p.getCidade());
        map.put("estado", p.getEstado());
        map.put("verificado", p.getVerificado());
        map.put("notaMedia", p.getNotaMedia());
        map.put("totalServicos", p.getTotalServicos());
        map.put("categorias", p.getCategorias().stream()
                .map(c -> Map.of("id", c.getId(), "nome", c.getNome(), "icone", c.getIcone()))
                .collect(Collectors.toList()));
        return map;
    }

    static class CadastroRequest {
        public Long usuarioId;
        public String descricao;
        public BigDecimal preco;
        public String tipoPreco;
        public String cidade;
        public String estado;
        public Set<Long> categoriaIds;
    }
}
