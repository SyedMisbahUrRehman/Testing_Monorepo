# Single Dockerfile for monorepo (apps/frontend, apps/backend)

FROM node:20-alpine AS base
WORKDIR /app

# ---------- Backend dev ----------
FROM base AS backend-dev
WORKDIR /app/backend
COPY apps/backend/package*.json ./
RUN npm install
COPY apps/backend ./
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---------- Backend builder ----------
FROM base AS backend-build
WORKDIR /app/backend
COPY apps/backend/package*.json ./
RUN npm install
COPY apps/backend ./
RUN npm run build

# ---------- Backend prod ----------
FROM node:20-alpine AS backend-prod
WORKDIR /app/backend
COPY --from=backend-build /app/backend/dist ./dist
COPY --from=backend-build /app/node_modules ./node_modules
COPY --from=backend-build /app/backend/package*.json ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]

# ---------- Frontend dev ----------
FROM base AS frontend-dev
WORKDIR /app/frontend
COPY apps/frontend/package*.json ./
RUN npm install
COPY apps/frontend ./
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ---------- Frontend builder ----------
FROM base AS frontend-build
WORKDIR /app/frontend
COPY apps/frontend/package*.json ./
RUN npm install
COPY apps/frontend ./
RUN npm run build

# ---------- Frontend prod (nginx) ----------
FROM nginx:stable-alpine AS frontend-prod
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

### Combined prod image: serve frontend via nginx and proxy /api to backend
FROM node:20-alpine AS prod
WORKDIR /app

# Copy built frontend assets
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Copy built backend
COPY --from=backend-build /app/backend/dist /app/backend/dist
COPY --from=backend-build /app/backend/node_modules /app/node_modules
COPY --from=backend-build /app/backend/package*.json /app/backend/

# Copy nginx config
COPY --from=frontend-prod /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Add a small start script to run backend and nginx together
COPY docker/start-prod.sh /usr/local/bin/start-prod.sh
RUN chmod +x /usr/local/bin/start-prod.sh

EXPOSE 80 3000
CMD ["/usr/local/bin/start-prod.sh"]


