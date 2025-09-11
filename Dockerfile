# Multi-stage build for Nuxt 4 (Nitro server)
FROM node:20-bookworm-slim AS builder

# Increase Node heap to avoid OOM "Killed" during build
ENV NODE_ENV=production \
    NODE_OPTIONS=--max-old-space-size=2048 \
    NUXT_TELEMETRY_DISABLED=1
WORKDIR /app

# Enable pnpm via corepack to match repo version
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# Install deps first (better cache)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
# Nota: no usamos --frozen-lockfile para permitir instalar nuevas devDeps
# sin tener que actualizar el lockfile en el repo (p. ej., tailwindcss).
RUN pnpm install

# Copy source and build
COPY . .
RUN pnpm build

# Prune to production deps for runtime stage (keeps native binaries built)
RUN pnpm prune --prod

FROM node:20-bookworm-slim AS runner

ENV NODE_ENV=production \
    NODE_OPTIONS=--max-old-space-size=1024 \
    PORT=3000 \
    HOST=0.0.0.0 \
    NITRO_PORT=3000 \
    NUXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copy Nitro output and production node_modules
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
