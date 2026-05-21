#!/bin/bash
# =============================================
# Minha Vitrine - Backup do Banco de Dados
# =============================================
# Adicione no crontab: 0 2 * * * /home/ubuntu/minhavitrine/scripts/backup-db.sh

BACKUP_DIR="/home/ubuntu/minhavitrine/backups"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

mkdir -p $BACKUP_DIR

echo "💾 Backup MySQL - $DATE"

# Dump do banco
docker exec minhavitrine-mysql mysqldump -u root -p${MYSQL_ROOT_PASSWORD:-minhavitrine2026} minhavitrine | gzip > $BACKUP_DIR/minhavitrine_$DATE.sql.gz

if [ $? -eq 0 ]; then
  SIZE=$(du -h $BACKUP_DIR/minhavitrine_$DATE.sql.gz | cut -f1)
  echo "✅ Backup criado: minhavitrine_$DATE.sql.gz ($SIZE)"
else
  echo "❌ Erro no backup!"
  exit 1
fi

# Limpar backups antigos
find $BACKUP_DIR -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete
TOTAL=$(ls -1 $BACKUP_DIR/*.sql.gz 2>/dev/null | wc -l)
echo "📦 Total de backups mantidos: $TOTAL (últimos $RETENTION_DAYS dias)"
