# Stage 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install ALL dependencies (включая devDependencies для сборки)
RUN npm ci

# Copy all source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production server
FROM nginx:alpine

# Установка openssl для генерации сертификатов
RUN apk add --no-cache openssl

# Создаем директорию для SSL сертификатов
RUN mkdir -p /etc/nginx/ssl

# Копируем nginx конфигурацию
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем entrypoint скрипт
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80 443

ENTRYPOINT ["/docker-entrypoint.sh"]