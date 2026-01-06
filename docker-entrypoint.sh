#!/bin/sh
set -e

echo "🔧 Starting container initialization..."

# Создаем директорию для SSL
mkdir -p /etc/nginx/ssl

# Генерируем SSL сертификат если не существует
if [ ! -f /etc/nginx/ssl/fullchain.pem ] || [ ! -f /etc/nginx/ssl/privkey.pem ]; then
    echo "🔐 Generating self-signed SSL certificate..."
    
    # Генерируем совместимый SSL сертификат
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/privkey.pem \
        -out /etc/nginx/ssl/fullchain.pem \
        -subj "/C=US/ST=State/L=City/O=Birthday/CN=localhost" \
        -addext "subjectAltName = DNS:localhost, DNS:*.localhost, IP:127.0.0.1"
    
    chmod 600 /etc/nginx/ssl/*.pem
    echo "✅ SSL certificates generated"
else
    echo "✅ SSL certificates already exist"
fi

# Проверяем конфигурацию nginx
echo "📋 Checking nginx configuration..."
nginx -t

echo "🚀 Starting nginx..."
exec nginx -g "daemon off;"