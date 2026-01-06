#!/bin/bash

echo "Setting up Docker build environment..."

# Create minimal nginx.conf if not exists
if [ ! -f "nginx.conf" ]; then
    echo "Creating nginx.conf..."
    cat > nginx.conf << 'NGINX_EOF'
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    server {
        listen 80;
        server_name _;
        
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
NGINX_EOF
    echo "✅ nginx.conf created"
fi

# Create Dockerfile if not exists
if [ ! -f "Dockerfile" ]; then
    echo "Creating Dockerfile..."
    cat > Dockerfile << 'DOCKER_EOF'
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
DOCKER_EOF
    echo "✅ Dockerfile created"
fi

echo "✅ Setup complete!"