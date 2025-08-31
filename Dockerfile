### Multi-stage Dockerfile for Create React App (production)
# 1) Build stage: node
FROM node:18-alpine AS build
WORKDIR /app

# copy package files first to leverage layer caching
COPY package*.json ./
COPY package-lock.json ./

RUN npm ci --silent

# copy rest and build
COPY . .
RUN npm run build

# 2) Run stage: nginx serving static files
FROM nginx:stable-alpine AS runner
LABEL org.opencontainers.image.source="https://github.com/IyenshiAUT/truefresh-frontend"

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Healthcheck (basic)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
