FROM node:24-alpine AS base

# Installs the production dependencies of the server from the workspace
# lockfile. Only the manifests are needed: the app itself is compiled
# outside of Docker (mise run //apps/server:build) and copied from `src`.
FROM base AS deps

RUN corepack enable
WORKDIR /workspace
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/server/package.json apps/server/
RUN pnpm --filter wisdom-journey-server deploy --prod /out

FROM base
EXPOSE 4000
WORKDIR /app

COPY --from=deps /out/package.json ./
COPY --from=deps /out/node_modules ./node_modules
COPY apps/server/prisma.config.ts apps/server/docker/entrypoint.sh ./
COPY apps/server/prisma ./prisma

COPY --from=src . ./
CMD [ "/bin/sh", "/app/entrypoint.sh" ]
