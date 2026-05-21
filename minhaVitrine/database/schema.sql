-- =============================================
-- Minha Vitrine - Schema do Banco de Dados
-- =============================================
CREATE DATABASE IF NOT EXISTS minha_vitrine;
USE minha_vitrine;

CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    foto_url VARCHAR(500),
    tipo ENUM('CLIENTE', 'PRESTADOR') NOT NULL DEFAULT 'CLIENTE',
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    icone VARCHAR(10),
    foto_url VARCHAR(500),
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE prestadores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL UNIQUE,
    descricao TEXT,
    preco_referencia DECIMAL(10,2),
    tipo_preco VARCHAR(30),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    verificado BOOLEAN DEFAULT FALSE,
    nota_media DECIMAL(2,1) DEFAULT 0.0,
    total_servicos INT DEFAULT 0,
    disponivel BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE prestador_categorias (
    prestador_id BIGINT NOT NULL,
    categoria_id BIGINT NOT NULL,
    PRIMARY KEY (prestador_id, categoria_id),
    FOREIGN KEY (prestador_id) REFERENCES prestadores(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
);

CREATE TABLE portfolio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    prestador_id BIGINT NOT NULL,
    foto_url VARCHAR(500) NOT NULL,
    descricao VARCHAR(200),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prestador_id) REFERENCES prestadores(id) ON DELETE CASCADE
);

CREATE TABLE solicitacoes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cliente_id BIGINT NOT NULL,
    prestador_id BIGINT NOT NULL,
    categoria_id BIGINT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    endereco VARCHAR(300),
    data_preferida DATE,
    urgente BOOLEAN DEFAULT FALSE,
    status ENUM('PENDENTE', 'ACEITO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO') DEFAULT 'PENDENTE',
    valor_orcamento DECIMAL(10,2),
    prazo_estimado VARCHAR(50),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id),
    FOREIGN KEY (prestador_id) REFERENCES prestadores(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE avaliacoes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    solicitacao_id BIGINT NOT NULL,
    avaliador_id BIGINT NOT NULL,
    avaliado_id BIGINT NOT NULL,
    nota INT NOT NULL CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (solicitacao_id) REFERENCES solicitacoes(id),
    FOREIGN KEY (avaliador_id) REFERENCES usuarios(id),
    FOREIGN KEY (avaliado_id) REFERENCES usuarios(id)
);

CREATE TABLE mensagens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    solicitacao_id BIGINT NOT NULL,
    remetente_id BIGINT NOT NULL,
    conteudo TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (solicitacao_id) REFERENCES solicitacoes(id),
    FOREIGN KEY (remetente_id) REFERENCES usuarios(id)
);

-- Índices
CREATE INDEX idx_prestadores_cidade ON prestadores(cidade);
CREATE INDEX idx_prestadores_disponivel ON prestadores(disponivel);
CREATE INDEX idx_solicitacoes_status ON solicitacoes(status);
CREATE INDEX idx_solicitacoes_cliente ON solicitacoes(cliente_id);
CREATE INDEX idx_solicitacoes_prestador ON solicitacoes(prestador_id);
CREATE INDEX idx_mensagens_solicitacao ON mensagens(solicitacao_id);
CREATE INDEX idx_avaliacoes_avaliado ON avaliacoes(avaliado_id);

-- Dados iniciais
INSERT INTO categorias (nome, icone) VALUES
('Mercado', '🛒'), ('Padaria', '🥖'), ('Beleza', '💄'), ('Perfumaria', '🏗️'),
('Piso', '🪵');
