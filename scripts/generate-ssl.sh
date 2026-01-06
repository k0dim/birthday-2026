#!/bin/bash

# Установка certbot на сервере
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email kond.01.163@gmail.com

# Настройка автоматического обновления
echo "0 12 * * * root certbot renew --quiet" | sudo tee -a /etc/crontab