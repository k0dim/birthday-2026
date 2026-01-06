#!/bin/sh
# Docker entrypoint script

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