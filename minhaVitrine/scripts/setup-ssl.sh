#!/bin/bash
# =============================================
# Minha Vitrine - Configurar HTTPS com Let's Encrypt
# =============================================
# Uso: ./scripts/setup-ssl.sh <DOMINIO> <EMAIL>
# Ex:  ./scripts/setup-ssl.sh minhavitrine.com.br admin@minhavitrine.com.br

DOMAIN=${1:?"Uso: $0 <dominio> <email>"}
EMAIL=${2:?"Uso: $0 <dominio> <email>"}

echo "🔒 Configurando HTTPS para $DOMAIN"

# 1. Instalar Certbot
sudo apt install -y certbot

# 2. Parar nginx para liberar porta 80
docker compose stop nginx

# 3. Gerar certificado
sudo certbot certonly --standalone -d $DOMAIN -m $EMAIL --agree-tos --non-interactive

# 4. Copiar certificados
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/
sudo chown ubuntu:ubuntu nginx/ssl/*.pem

# 5. Atualizar nginx.conf (descomentar bloco HTTPS)
sed -i 's/# server {/server {/g' nginx/nginx.conf
sed -i 's/#     listen 443/    listen 443/g' nginx/nginx.conf
sed -i "s/#     server_name minhavitrine.com.br/    server_name $DOMAIN/g" nginx/nginx.conf
sed -i 's/#     ssl_/    ssl_/g' nginx/nginx.conf
sed -i 's/#     location/    location/g' nginx/nginx.conf
sed -i 's/#         proxy/        proxy/g' nginx/nginx.conf
sed -i 's/#     }/    }/g' nginx/nginx.conf
sed -i 's/# }/}/g' nginx/nginx.conf

# 6. Reiniciar
docker compose up -d nginx

# 7. Setup renovação automática
echo "0 3 * * * certbot renew --post-hook 'docker compose -f /home/ubuntu/minhavitrine/docker-compose.yml restart nginx'" | sudo crontab -

echo ""
echo "✅ HTTPS configurado!"
echo "🌐 https://$DOMAIN"
echo "🔄 Renovação automática: todo dia às 3h"
