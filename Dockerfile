# Stage 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install ALL dependencies (включая devDependencies для сборки)
RUN npm ci

# Copy all source code
COPY . .

# Проверяем установленные зависимости
RUN npm list vite

# Запускаем проверку окружения
RUN npm run env:simple || echo "Environment check completed"

# Build the application
RUN npm run build

# Stage 2: Production server
FROM nginx:alpine

# Установка openssl для генерации сертификатов
RUN apk add --no-cache openssl

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Создаем директорию для SSL сертификатов
RUN mkdir -p /etc/nginx/ssl

# Создаем nginx конфигурацию
RUN cat > /etc/nginx/nginx.conf << 'EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    
    access_log /var/log/nginx/access.log main;
    
    sendfile on;
    tcp_nopush on;
    keepalive_timeout 65;
    
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/javascript application/xml+rss application/json;

    # HTTP сервер - редирект на HTTPS
    server {
        listen 80;
        listen [::]:80;
        server_name _;
        return 301 https://$host$request_uri;
    }

    # HTTPS сервер
    server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        server_name _;

        # SSL сертификаты (будут смонтированы или сгенерированы)
        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;

        # Настройки SSL
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        root /usr/share/nginx/html;
        index index.html;

        # Обслуживание статических файлов
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Кэширование статических ресурсов
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Запрет доступа к скрытым файлам
        location ~ /\. {
            deny all;
        }
    }
}
EOF

# Создаем entrypoint скрипт
RUN echo '#!/bin/sh
# Генерируем self-signed SSL сертификат если не существует
if [ ! -f /etc/nginx/ssl/fullchain.pem ] || [ ! -f /etc/nginx/ssl/privkey.pem ]; then
    echo "🔐 Generating self-signed SSL certificate..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/privkey.pem \
        -out /etc/nginx/ssl/fullchain.pem \
        -subj "/C=US/ST=State/L=City/O=Birthday/CN=localhost"
    chmod 600 /etc/nginx/ssl/*.pem
    echo "✅ SSL certificates generated"
fi

echo "🚀 Starting nginx..."
exec nginx -g "daemon off;"
' > /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

EXPOSE 80 443

ENTRYPOINT ["/docker-entrypoint.sh"]