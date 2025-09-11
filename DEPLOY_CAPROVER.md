# Despliegue en CapRover

Este proyecto es Nuxt 4 (SSR con Nitro). Se deploya como contenedor Node que escucha en el puerto 3000.

## Archivos añadidos
- `Dockerfile`: build multi-stage (Node 20) que compila con pnpm y ejecuta Nitro.
- `captain-definition`: indica a CapRover usar el `Dockerfile` y expone `3000`.
- `.dockerignore`: reduce el contexto de build.

## Requisitos en CapRover
- CapRover 1.10+ (o equivalente) con un nodo capaz de ejecutar imágenes `node:20-bookworm-slim`.
- Crear una app en CapRover (tipo Web App) con HTTP habilitado.

## Variables recomendadas
Configura en la app (Panel CapRover → App Configs → Environmental Variables):
- `NODE_ENV=production`
- `NUXT_PUBLIC_SITE_URL=https://tu-dominio` (ajusta al dominio real)

CapRover asigna `PORT` automáticamente; el contenedor escucha en `3000` y CapRover hace el mapeo.

## Despliegue
Opción A: CLI (recomendado)
1. Instala CLI: `npm i -g caprover`
2. Login: `caprover login` (apunta a tu servidor)
3. Desde la raíz del repo: `caprover deploy`
   - Selecciona la app creada.

Opción B: Dashboard web
1. App → Deploy → Método: `Upload captain-definition`.
2. Sube el archivo `captain-definition` (CapRover leerá el Dockerfile del repo).

## Notas
- La imagen usa Debian slim para maximizar compatibilidad con dependencias nativas como `better-sqlite3`.
- Nitro respeta `PORT`/`NITRO_PORT`; se fija a `3000` dentro del contenedor.
- Si necesitas headers/variables adicionales, configúralas en CapRover sin rebuild (reinicio suave basta).

## Verificación rápida
- Revisa logs: `caprover appslogs -a <appName>` o desde el panel.
- Abre `/` del dominio asignado; el healthcheck usa el mismo puerto/endpoint.

