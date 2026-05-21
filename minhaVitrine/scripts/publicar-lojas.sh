#!/bin/bash
# =============================================
# Minha Vitrine - Publicar nas Lojas (Google Play + App Store)
# =============================================
set -e

echo "📱 Minha Vitrine - Build & Publicação"
echo "==========================================="

# Pré-requisitos
echo ""
echo "✅ Checklist antes de publicar:"
echo "   [ ] Ícone 1024x1024 em assets/"
echo "   [ ] Screenshots de todas as telas"
echo "   [ ] Política de privacidade (URL)"
echo "   [ ] Google Play: google-play-key.json na pasta frontend/"
echo "   [ ] Apple: Apple ID e Team ID em eas.json"
echo ""
read -p "Tudo pronto? (s/n) " -n 1 -r
echo ""
[[ ! $REPLY =~ ^[Ss]$ ]] && echo "❌ Cancelado." && exit 1

cd frontend

# 1. Instalar dependências
echo "📦 [1/4] Instalando dependências..."
npm ci

# 2. Login no EAS
echo "🔑 [2/4] Login no Expo..."
npx eas-cli login

# 3. Build
echo "🏗️  [3/4] Gerando builds..."
echo ""

echo "--- Android (.aab) ---"
npx eas-cli build --platform android --profile production

echo ""
echo "--- iOS (.ipa) ---"
npx eas-cli build --platform ios --profile production

# 4. Submit
echo "🚀 [4/4] Enviando para as lojas..."
echo ""

echo "--- Google Play ---"
npx eas-cli submit --platform android --profile production

echo ""
echo "--- App Store ---"
npx eas-cli submit --platform ios --profile production

echo ""
echo "==========================================="
echo "✅ PUBLICAÇÃO CONCLUÍDA!"
echo "==========================================="
echo ""
echo "📱 Google Play Console: https://play.google.com/console"
echo "🍎 App Store Connect:   https://appstoreconnect.apple.com"
echo ""
echo "⏳ O review pode levar:"
echo "   Google Play: 1-7 dias"
echo "   App Store:   1-3 dias"
echo ""
