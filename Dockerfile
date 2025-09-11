# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    NITRO_PORT=3000 \
    NITRO_HOST=0.0.0.0

# Copiamos SOLO la build ya compilada
COPY .output ./.output

# Instalar dependencias de RUNTIME si las hubiera:
# (Nitro escribe .output/server/package.json cuando quedan deps externas)
RUN set -eux; \
    if [ -f ".output/server/package.json" ]; then \
      cd .output/server && \
      npm i --omit=dev --no-audit --no-fund --prefer-offline; \
    fi

# Salud simple usando fetch de Node 20 (sin instalar curl)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD node -e "fetch('http://127.0.0.1:'+ (process.env.PORT||process.env.NITRO_PORT||3000)).then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

EXPOSE 3000
USER node
CMD ["node", ".output/server/index.mjs"]
