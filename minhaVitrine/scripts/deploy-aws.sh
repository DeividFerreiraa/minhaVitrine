#!/bin/bash
# =============================================
# Minha Vitrine - Deploy Inicial na AWS EC2
# =============================================
# Uso: ./scripts/deploy-aws.sh <IP_DO_SERVIDOR> <CAMINHO_CHAVE_SSH>
# Ex:  ./scripts/deploy-aws.sh 18.230.45.67 ~/.ssh/minhavitrine-key.pem

set -e

EC2_HOST=${1:?"Uso: $0 <IP_EC2> <CHAVE_SSH>"}
SSH_KEY=${2:?"Uso: $0 <IP_EC2> <CHAVE_SSH>"}
EC2_USER="ubuntu"
PROJECT_DIR="/home/ubuntu/minhavitrine"

echo "🚀 Minha Vitrine - Deploy para $EC2_HOST"
echo "==========================================="

# 1. Instalar Docker no servidor
echo "📦 [1/5] Instalando Docker..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST << 'SETUP'
  sudo apt update -y
  sudo apt install -y docker.io docker-compose-v2 git
  sudo systemctl enable docker && sudo systemctl start docker
  sudo usermod -aG docker ubuntu
  mkdir -p /home/ubuntu/minhavitrine
SETUP

# 2. Copiar arquivos do projeto
echo "📤 [2/5] Enviando arquivos..."
scp -i $SSH_KEY -r \
  docker-compose.yml \
  .env \
  database/ \
  backend/ \
  nginx/ \
  $EC2_USER@$EC2_HOST:$PROJECT_DIR/

# 3. Subir os containers
echo "🐳 [3/5] Subindo containers..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST << 'DEPLOY'
  cd /home/ubuntu/minhavitrine
  docker compose build --no-cache
  docker compose up -d
  echo "⏳ Aguardando backend..."
  sleep 30
  docker compose ps
DEPLOY

# 4. Testar API
echo "🧪 [4/5] Testando API..."
sleep 5
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://$EC2_HOST/api/categorias)
if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ API respondendo (HTTP $HTTP_CODE)"
else
  echo "⚠️  API retornou HTTP $HTTP_CODE"
fi

# 5. Info final
echo ""
echo "==========================================="
echo "✅ DEPLOY CONCLUÍDO!"
echo "==========================================="
echo ""
echo "🌐 API:     http://$EC2_HOST/api/categorias"
echo "📱 App:     Edite frontend/src/services/api.js"
echo "            BASE_URL = 'http://$EC2_HOST:8080/api'"
echo ""
echo "📋 Comandos úteis:"
echo "   ssh -i $SSH_KEY $EC2_USER@$EC2_HOST"
echo "   docker compose logs -f"
echo "   docker compose restart"
echo ""
