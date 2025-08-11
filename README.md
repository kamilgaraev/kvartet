## Kvartett Website

Next.js 15 (App Router) + Prisma + PostgreSQL.

### Продакшн-деплой (Docker)

См. инструкции в разделе Deploy ниже.

### Обновление через SSH (без GitHub Actions и без панели Timeweb)

Ниже минимальные команды для ручного обновления приложения на сервере с Docker Compose.

Требования на сервере один раз:
- Docker и docker compose
- Клон репозитория в `/opt/kvartett-website`
- Заполненный `.env`

Подключение и обновление релиза:

```bash
# 1) Подключиться к серверу
ssh root@92.51.23.93

# 2) Перейти в каталог проекта
cd /opt/kvartett-website

# 3) Подтянуть актуальный код из ветки main
git fetch --all --prune
git reset --hard origin/main

# 4) Пересобрать образы и поднять контейнеры
docker compose down
docker compose build --no-cache --pull
docker compose up -d

# 5) Проверить логи приложения
docker compose logs -f app | cat
```

Применить миграции БД (если нужно вручную):
```bash
docker compose exec app npx prisma migrate deploy
```

Быстрый рестарт без пересборки:
```bash
docker compose restart app
```

Обновить переменные окружения (пример для смены домена):
```bash
sed -i "s|^NEXTAUTH_URL=.*|NEXTAUTH_URL=https://example.com|g" .env
docker compose up -d
```

Примечания:
- Сборка настроена в `next.config.ts` как `output: 'standalone'`; миграции применяются в entrypoint при старте (`docker-entrypoint.sh`).
- Если используется локальный Postgres из `docker-compose.yml` без volume, данные не сохраняются между пересборками. Для продакшна рекомендован Managed PostgreSQL и `DATABASE_URL` с URI провайдера.
