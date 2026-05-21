package com.minhavitrine.repository;

import com.minhavitrine.model.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    List<Solicitacao> findByClienteIdOrderByCriadoEmDesc(Long clienteId);

    List<Solicitacao> findByPrestadorIdOrderByCriadoEmDesc(Long prestadorId);

    List<Solicitacao> findByPrestadorIdAndStatus(Long prestadorId, Solicitacao.StatusSolicitacao status);
}
