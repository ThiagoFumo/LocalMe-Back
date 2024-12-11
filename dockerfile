# Etapa 1: Construcción
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:18-slim AS runner
WORKDIR /app
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
RUN npm install --production && npm cache clean --force

EXPOSE 3000
CMD ["node", "-r", "tsconfig-paths/register", "-r", "module-alias/register", "./dist/src/index.js", "--env=production"]
