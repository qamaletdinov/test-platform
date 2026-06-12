#!/bin/bash

echo "=== Сборка проекта ==="
npm run build

echo ""
echo "=== Готово! ==="
echo "Локальный просмотр: npm run preview"
echo "Деплой на VPS:"
echo "  scp -r dist/ user@vps:/var/www/test-platform/"
