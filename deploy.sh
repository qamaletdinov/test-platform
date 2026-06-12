#!/bin/bash

VPS_USER="${VPS_USER:-root}"
VPS_HOST="${VPS_HOST:-your-vps.com}"
VPS_PATH="${VPS_PATH:-/var/www/test-platform}"

echo "=== Сборка ==="
npm run build

echo ""
echo "=== Деплой на $VPS_USER@$VPS_HOST:$VPS_PATH ==="
scp -r dist/* "$VPS_USER@$VPS_HOST:$VPS_PATH/"

echo ""
echo "=== Готово! ==="
