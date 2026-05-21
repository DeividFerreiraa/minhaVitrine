package com.minhavitrine.controller;

import com.minhavitrine.model.Solicitacao;
import com.minhavitrine.service.SolicitacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/solicitacoes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SolicitacaoController {

    private final SolicitacaoService solicitacaoService;

    /**
     * POST /api/solicitacoes
     * Cria uma nova solicitação de serviço
     */
    @PostMapping
    public ResponseEntity<?> criar(@RequestBody CriarRequest request) {
        try {
            Solicitacao solicitacao = solicitacaoService.criar(
                    request.clienteId,
                    request.prestadorId,
                    request.categoriaId,
                    request.titulo,
                    request.descricao,
                    request.endereco,
                    request.dataPreferida
            );
            return ResponseEntity.ok(toMap(solicitacao));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    /**
     * PUT /api/solicitacoes/{id}/status
     * Atualiza o status (ACEITO, EM_ANDAMENTO, CONCLUIDO, CANCELADO)
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id,
                                              @RequestBody StatusRequest request) {
        try {
            Solicitacao solicitacao = solicitacaoService.atualizarStatus(id, request.status);
            return ResponseEntity.ok(toMap(solicitacao));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    /**
     * GET /api/solicitacoes/cliente/{clienteId}
     * Lista solicitações do cliente
     */
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Map<String, Object>>> listarPorCliente(@PathVariable Long clienteId) {
        List<Map<String, Object>> response = solicitacaoService.listarPorCliente(clienteId)
                .stream().map(this::toMap).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/solicitacoes/prestador/{prestadorId}
     * Lista solicitações do prestador
     */
    @GetMapping("/prestador/{prestadorId}")
    public ResponseEntity<List<Map<String, Object>>> listarPorPrestador(@PathVariable Long prestadorId) {
        List<Map<String, Object>> response = solicitacaoService.listarPorPrestador(prestadorId)
                .stream().map(this::toMap).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    private Map<String, Object> toMap(Solicitacao s) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", s.getId());
        map.put("titulo", s.getTitulo());
        map.put("descricao", s.getDescricao());
        map.put("endereco", s.getEndereco());
        map.put("dataPreferida", s.getDataPreferida());
        map.put("status", s.getStatus());
        map.put("valorOrcamento", s.getValorOrcamento());
        map.put("clienteNome", s.getCliente().getNome());
        map.put("prestadorNome", s.getPrestador().getUsuario().getNome());
        map.put("categoria", s.getCategoria().getNome());
        map.put("criadoEm", s.getCriadoEm());
        return map;
    }

    static class CriarRequest {
        public Long clienteId;
        public Long prestadorId;
        public Long categoriaId;
        public String titulo;
        public String descricao;
        public String endereco;
        public LocalDate dataPreferida;
    }

    static class StatusRequest {
        public Solicitacao.StatusSolicitacao status;
    }
}
