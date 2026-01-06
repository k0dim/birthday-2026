# Приглашение на день рождения

Веб-приглашение на день рождения с функцией подтверждения участия.

## Особенности
- Адаптивный дизайн
- Анимации с Framer Motion
- Интеграция с календарями (Google/Apple)
- Яндекс Карты
- Форма RSVP

## Установка
```bash
npm install

# Infrastructure Configuration

## Server Requirements
- Ubuntu 20.04/22.04
- 1 GB RAM minimum
- 10 GB disk space
- Public IP address

## Pre-installed Software
- Nginx
- OpenSSL
- Node.js (optional)
- Git

## SSL Certificate Setup
```bash
# Generate self-signed certificate (for testing)
sudo mkdir -p /etc/ssl/certs /etc/ssl/private
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/birthday-invitation.key \
  -out /etc/ssl/certs/birthday-invitation.crt \
  -subj "/C=RU/ST=Samara/L=Samara/O=Birthday/CN=$DOMAIN"

# Or use Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d $DOMAIN

Monitoring

    Logs: /var/www/birthday-invitation/logs/

    Nginx logs: /var/log/nginx/

    Health check: https://domain.com/health

    Version: https://domain.com/version