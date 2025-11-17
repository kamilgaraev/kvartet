# Настройка базы данных

После удаления Docker, у вас есть несколько вариантов для PostgreSQL базы данных:

## 🚀 Вариант 1: Neon (Рекомендуется)

**Бесплатно:** 0.5 GB хранилище, 1 проект
**Особенности:** Serverless PostgreSQL, автоматическое масштабирование, встроенный connection pooling

### Настройка:
1. Создайте аккаунт на [neon.tech](https://neon.tech)
2. Создайте новый проект
3. Скопируйте connection string
4. Вставьте в `.env`:
   ```
   DATABASE_URL=postgresql://username:password@ep-xxx.region.aws.neon.tech/kvartett?sslmode=require
   ```

## 💚 Вариант 2: Supabase

**Бесплатно:** 500 MB база данных, 2 GB bandwidth
**Особенности:** PostgreSQL + дополнительные фичи (Auth, Storage, Realtime)

### Настройка:
1. Создайте аккаунт на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Перейдите в Settings → Database
4. Скопируйте "Connection string" (Direct connection)
5. Вставьте в `.env`:
   ```
   DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
   ```

## ▲ Вариант 3: Vercel Postgres

**Бесплатно:** 256 MB для hobby проектов
**Особенности:** Интеграция с Vercel, serverless

### Настройка:
1. Установите Vercel CLI: `npm i -g vercel`
2. Войдите: `vercel login`
3. Создайте PostgreSQL: `vercel postgres create`
4. Подключите к проекту: `vercel link`
5. Получите credentials: `vercel env pull`

## 🖥️ Вариант 4: Локальный PostgreSQL

**Бесплатно:** Безлимит
**Особенности:** Полный контроль, но требует установки

### Windows:
1. Скачайте PostgreSQL с [postgresql.org](https://www.postgresql.org/download/windows/)
2. Установите через installer
3. Создайте базу данных:
   ```bash
   psql -U postgres
   CREATE DATABASE kvartett;
   ```
4. В `.env`:
   ```
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/kvartett
   ```

### macOS (через Homebrew):
```bash
brew install postgresql@16
brew services start postgresql@16
createdb kvartett
```

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres createdb kvartett
```

## 📝 После настройки базы данных:

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Push схему в базу:
   ```bash
   npm run db:push
   ```

3. Заполните тестовыми данными:
   ```bash
   npm run db:seed
   ```

4. Запустите проект:
   ```bash
   npm run dev
   ```

5. (Опционально) Откройте Drizzle Studio для управления БД:
   ```bash
   npm run db:studio
   ```

## 🎯 Мои рекомендации:

- **Для разработки:** Neon или Supabase (быстрая настройка, бесплатно)
- **Для продакшена с Vercel:** Vercel Postgres (лучшая интеграция)
- **Для полного контроля:** Локальный PostgreSQL

## ⚡ Деплой без Docker:

### Vercel (Рекомендуется):
1. Установите Vercel CLI: `npm i -g vercel`
2. Деплой: `vercel`
3. Добавьте переменные окружения в Vercel dashboard

### Другие хостинги:
- **Railway:** Автоматический деплой из GitHub, включает PostgreSQL
- **Render:** Бесплатный tier, поддержка PostgreSQL
- **Fly.io:** Serverless деплой с PostgreSQL

Все современные платформы поддерживают Next.js без Docker!

