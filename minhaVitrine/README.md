# 📱 Minha Vitrine - Marketplace de Serviços

App que conecta clientes com comércios e prestadores de serviços (Padarias, mercados, barbearias, etc).

**Stack:** React Native (Expo) + Spring Boot + MySQL + Docker + AWS

---

## 🏗️ Estrutura do Projeto

```
minhavitrine/
├── frontend/          → App React Native (Expo)
│   ├── App.js         → Navegação principal
│   ├── src/screens/   → 11 telas (cliente + prestador)
│   └── src/services/  → Conexão com API
├── backend/           → API REST (Spring Boot + Java 17)
│   └── src/main/java/com/minhavitrine/
├── database/          → Schema MySQL
├── nginx/             → Proxy reverso + SSL
├── scripts/           → Deploy, backup, SSL, publicação
├── .github/workflows/ → CI/CD (GitHub Actions)
└── docker-compose.yml → Orquestração dos containers
```

---

## PARTE 1 — Rodar App no Celular (Local)

### Pré-requisitos
- Node.js 18+
- App **Expo Go** no celular (Play Store / App Store)
- Celular e PC na mesma rede Wi-Fi

### Comandos
```bash
cd frontend
npm install
npx expo start
```
Escaneie o QR code com o Expo Go.

**Problema com cache?**
```bash
npx expo start --clear
```

---

## PARTE 2 — Rodar Backend com Docker (Local)

### Pré-requisitos
- Docker Desktop instalado
- WSL 2 ativado (Windows)

### Comandos
```bash
cp .env.example .env    # Edite as senhas
docker compose up -d    # Sobe MySQL + Backend + Nginx
```

### Testar API
```bash
curl http://localhost:8080/api/categorias
```

### Conectar App ao Backend
Edite `frontend/src/services/api.js`:
```javascript
const BASE_URL = 'http://SEU_IP_LOCAL:8080/api';
```
Descubra seu IP: `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)

---

## PARTE 3 — Deploy na AWS (Produção)

### 3.1 Criar EC2
1. Acesse [AWS Console](https://console.aws.amazon.com) → EC2 → Launch Instance
2. **AMI:** Ubuntu 24.04
3. **Tipo:** t3.small (~US$15/mês)
4. **Storage:** 30 GB
5. **Security Group:** Libere portas 22, 80, 443, 8080
6. Crie um Key Pair e salve o `.pem`

### 3.2 Deploy automático
```bash
chmod +x scripts/deploy-aws.sh
./scripts/deploy-aws.sh <IP_EC2> <caminho_chave.pem>
```

### 3.3 Domínio + HTTPS
```bash
# No servidor EC2:
chmod +x scripts/setup-ssl.sh
./scripts/setup-ssl.sh minhavitrine.com.br admin@minhavitrine.com.br
```

### 3.4 Backup automático
```bash
chmod +x scripts/backup-db.sh
crontab -e
# Adicione: 0 2 * * * /home/ubuntu/minhavitrine/scripts/backup-db.sh
```

---

## PARTE 4 — CI/CD (GitHub Actions)

O pipeline roda automaticamente a cada `push` na branch `main`:

1. **Testa** o backend (Maven)
2. **Builda** a imagem Docker
3. **Deploia** no EC2 via SSH
4. **Builda** o app mobile via EAS

### Configurar Secrets no GitHub
Vá em Settings → Secrets → Actions e adicione:
- `EC2_HOST` → IP do seu servidor
- `EC2_SSH_KEY` → Conteúdo do arquivo .pem
- `EXPO_TOKEN` → Token do Expo (npx expo login)

---

## PARTE 5 — Publicar nas Lojas

### Custos
| Item | Custo |
|------|-------|
| Google Play (conta dev) | US$ 25 (única vez) |
| Apple Developer | US$ 99 / ano |

### Pré-requisitos
- Ícone 1024x1024 PNG
- 4-6 screenshots do app
- Política de privacidade (URL)
- Google: arquivo `google-play-key.json`
- Apple: Apple ID + Team ID

### Publicar
```bash
chmod +x scripts/publicar-lojas.sh
./scripts/publicar-lojas.sh
```

---

## 📊 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/auth/registro | Cadastrar usuário |
| POST | /api/auth/login | Login |
| GET | /api/categorias | Listar categorias |
| GET | /api/prestadores | Listar prestadores |
| GET | /api/prestadores/{id} | Detalhe do prestador |
| GET | /api/prestadores/categoria/{id} | Por categoria |
| POST | /api/solicitacoes | Criar solicitação |
| GET | /api/solicitacoes/cliente/{id} | Pedidos do cliente |
| GET | /api/solicitacoes/prestador/{id} | Recebidos pelo prestador |
| PUT | /api/solicitacoes/{id}/status | Atualizar status |

---

## 💰 Estimativa de Custos

| Fase | Custo mensal |
|------|-------------|
| Desenvolvimento (local) | R$ 0 |
| Produção até 500 usuários | ~R$ 90/mês |
| 1.000-10.000 usuários | ~R$ 285/mês |
| 10.000+ usuários | ~R$ 715/mês |

**Dica:** AWS Free Tier dá 12 meses grátis de EC2 t2.micro + RDS.
