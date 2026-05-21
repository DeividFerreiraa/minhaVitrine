package com.minhavitrine.repository;

import com.minhavitrine.model.Prestador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface PrestadorRepository extends JpaRepository<Prestador, Long> {

    Optional<Prestador> findByUsuarioId(Long usuarioId);

    List<Prestador> findByCidade(String cidade);

    // Buscar prestadores por categoria
    @Query("SELECT p FROM Prestador p JOIN p.categorias c WHERE c.nome = :categoria")
    List<Prestador> findByCategoria(@Param("categoria") String categoria);

    // Buscar por cidade e categoria
    @Query("SELECT p FROM Prestador p JOIN p.categorias c WHERE c.nome = :categoria AND p.cidade = :cidade")
    List<Prestador> findByCidadeAndCategoria(@Param("cidade") String cidade, @Param("categoria") String categoria);

    // Buscar os melhores avaliados
    List<Prestador> findTop10ByOrderByNotaMediaDesc();
}
