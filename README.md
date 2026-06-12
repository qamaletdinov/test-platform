# Тесты — Подготовка к экзаменам

Веб-платформа для тестирования по предметам. Генерирует случайные тесты из банка вопросов.

## Возможности

- Тесты по отдельным предметам (20 вопросов)
- Общий тест из всех предметов (100 вопросов)
- Несколько правильных ответов
- Подсветка правильных/неправильных ответов после завершения
- Адаптивный тёмный интерфейс

## Технологии

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v6

## Быстрый старт (localhost)

```bash
git clone <repo-url>
cd test-platform
npm install
npm run dev
```

Открой http://localhost:5173

## Деплой на VPS (Nginx)

### 1. Сборка

```bash
npm run build
```

### 2. Копирование на сервер

```bash
scp -r dist/ user@your-vps:/var/www/test-platform/
```

### 3. Конфигурация Nginx

Создай файл `/etc/nginx/sites-available/test-platform`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/test-platform;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кэширование статики
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 4. Активация

```bash
sudo ln -s /etc/nginx/sites-available/test-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. HTTPS (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Деплой на VPS (Caddy — проще)

Caddy автоматически настраивает HTTPS:

```bash
# Установи Caddy
sudo apt install -y caddy

# Создай /etc/caddy/Caddyfile:
your-domain.com {
    root * /var/www/test-platform
    file_server
    try_files {path} /index.html
}

# Запусти
sudo systemctl restart caddy
```

## Импорт вопросов из Word

1. Скинь .docx файлы в `scripts/files/`
2. Запусти парсер:

```bash
node scripts/import-docx.cjs
```

3. Вопросы автоматически обновятся в `src/data/questions.ts`

Поддерживаемые форматы:
- Зелёная подсветка (green)
- Бирюзовая подсветка (cyan)
- Нумерованные и безномерные вопросы
- Варианты на отдельных строках или в одну строку
