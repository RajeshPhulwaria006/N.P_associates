# Multi-stage build for client Vite React app

# Stage 1: Build static assets
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY index.html vite.config.js eslint.config.js ./
COPY src ./src

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS runner

# Copy customized nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build artifacts from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
