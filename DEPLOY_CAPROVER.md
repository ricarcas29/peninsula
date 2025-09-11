# Despliegue en CapRover

Este proyecto es Nuxt 4 (SSR con Nitro). Se despliega como contenedor Node escuchando en el puerto 3000.

## Archivos incluidos
- `Dockerfile`: build multi-stage (Node 20) que compila con pnpm y ejecuta Nitro.
- `captain-definition`: indica a CapRover usar el `Dockerfile` y expone `3000`.
- `.dockerignore`: reduce el contexto de build.

## Requisitos en CapRover
- CapRover 1.10+ con soporte para imágenes `node:20-bookworm-slim`.
- Crear una Web App con HTTP habilitado.

## Variables de entorno (configura en CapRover)
En App Configs → Environmental Variables. Recomendadas:

- `NODE_ENV=production`
- `NUXT_PUBLIC_SITE_URL=https://tu-dominio`  ← incluye `https://`
- `NUXT_PUBLIC_SITE_NAME` (por defecto: "Península Cross Cancún")
- `NUXT_PUBLIC_SITE_BRAND` (por defecto: "Península Cross")
- `NUXT_PUBLIC_SITE_DESCRIPTION_META` (meta description)
- `NUXT_PUBLIC_SITE_DESCRIPTION_TEXT` (texto descriptivo largo)
- `NUXT_PUBLIC_SITE_IMAGE` (URL absoluta o ruta como `/logo.jpg`)
- `NUXT_IMAGE_PROVIDER` (opcional, por defecto `ipx`)
- `NUXT_IMAGE_DOMAINS` (opcional, coma-separado para dominios remotos)

## Despliegue
Opción A: CLI (recomendado)
1. Instala CLI: `npm i -g caprover`
2. Login: `caprover login`
3. Desde la raíz del repo: `caprover deploy`
   - Selecciona la app creada.
   - Cuando pregunte el método de build, elige “Build on your machine” para evitar errores “Killed” por falta de memoria en el servidor. Compila localmente y sube la imagen al registro interno de CapRover.

Opción B: Dashboard web
1. App → Deploy → Método: `Upload captain-definition`.
2. Sube `captain-definition` (CapRover usará el Dockerfile del repo).

## Notas
- Hemos eliminado `better-sqlite3` para reducir compilación nativa pesada. `sharp` usa binarios precompilados.
- Nitro respeta `PORT`/`NITRO_PORT`; el contenedor escucha en `3000` y CapRover hace el mapeo.

### Si ves "Killed" durante el build en CapRover
- Es el OOM killer del servidor (memoria insuficiente). Usa “Build on your machine” del CLI, o aumenta recursos del nodo.
- Alternativamente, construye la imagen en local (`docker build .`) y publícala en un registro accesible por CapRover.

## Verificación
- Logs: `caprover appslogs -a <appName>`
- Abre `/` del dominio asignado; el healthcheck usa el mismo puerto.

