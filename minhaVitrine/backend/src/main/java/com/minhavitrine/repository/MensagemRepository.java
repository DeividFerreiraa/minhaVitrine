package com.minhavitrine.repository;

import com.minhavitrine.model.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MensagemRepository extends JpaRepository<Mensagem, Long> {

    List<Mensagem> findBySolicitacaoIdOrderByCriadoEmAsc(Long solicitacaoId);

    // Contar mensagens não lidas
    Long countBySolicitacaoIdAndRemetenteIdNotAndLidaFalse(Long solicitacaoId, Long usuarioId);
}
