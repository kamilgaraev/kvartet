# --- Builder stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Устанавливаем прод-окружение, но разрешаем установку dev-зависимостей для сборки
ENV NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=false

# Системные зависимости для sharp
RUN apk add --no-cache libc6-compat python3 make g++

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* .npmrc* ./
RUN npm ci --legacy-peer-deps

COPY . .

# Генерация Prisma клиента до билда
RUN npx prisma generate

# Сборка standalone
RUN npm run build

# --- Runtime stage ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Точно такие же системные зависимости для sharp в рантайме
RUN apk add --no-cache libc6-compat

# Пользователь без root
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Копируем standalone сборку
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Стартовый скрипт выполнит миграции и запустит сервер
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000

USER nextjs

CMD ["./docker-entrypoint.sh"]


