# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Accept build arguments for Vite environment variables
ARG VITE_API_ENDPOINT
ARG VITE_API_SPRINTS_ENDPOINT
ARG VITE_API_CACHE_TTL
ARG VITE_API_TIMEOUT
ARG VITE_CHAT_WEBHOOK_URL

# Convert ARGs to ENVs so Vite can access them during build
ENV VITE_API_ENDPOINT=$VITE_API_ENDPOINT
ENV VITE_API_SPRINTS_ENDPOINT=$VITE_API_SPRINTS_ENDPOINT
ENV VITE_API_CACHE_TTL=$VITE_API_CACHE_TTL
ENV VITE_API_TIMEOUT=$VITE_API_TIMEOUT
ENV VITE_CHAT_WEBHOOK_URL=$VITE_CHAT_WEBHOOK_URL

# Build the app (Vite will embed these env vars in the bundle)
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
