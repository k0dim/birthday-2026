# Stage 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy all source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production server
FROM nginx:alpine

# Install bash for SSL script (optional)
RUN apk add --no-cache bash openssl

# Create SSL directory
RUN mkdir -p /etc/nginx/ssl

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create a script to generate self-signed SSL certs on startup
RUN echo '#!/bin/sh\n\
if [ ! -f /etc/nginx/ssl/fullchain.pem ]; then\n\
    echo "Generating self-signed SSL certificate..."\n\
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\\n\
        -keyout /etc/nginx/ssl/privkey.pem \\\n\
        -out /etc/nginx/ssl/fullchain.pem \\\n\
        -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"\n\
    chmod 600 /etc/nginx/ssl/*.pem\n\
fi\n\
exec nginx -g "daemon off;"' > /docker-entrypoint.sh \
    && chmod +x /docker-entrypoint.sh

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["/docker-entrypoint.sh"]