package com.minhavitrine.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "prestadores")
public class Prestador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "preco_referencia", precision = 10, scale = 2)
    private BigDecimal precoReferencia;

    @Column(name = "tipo_preco", length = 30)
    private String tipoPreco; // "por dia", "por m²", "por visita"

    @Column(length = 100)
    private String cidade;

    @Column(length = 2)
    private String estado;

    @Column(nullable = false)
    private Boolean verificado = false;

    @Column(name = "nota_media", precision = 2, scale = 1)
    private BigDecimal notaMedia = BigDecimal.ZERO;

    @Column(name = "total_servicos")
    private Integer totalServicos = 0;

    @ManyToMany
    @JoinTable(
        name = "prestador_categorias",
        joinColumns = @JoinColumn(name = "prestador_id"),
        inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private Set<Categoria> categorias = new HashSet<>();

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();
}
