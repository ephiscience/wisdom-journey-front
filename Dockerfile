FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm prisma generate && pnpm build
# Ici, l'application est compilée

FROM node:24-alpine AS deps
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM node:24-alpine
EXPOSE 4000
WORKDIR /app

COPY package.json prisma.config.ts docker/entrypoint.sh ./
COPY prisma ./prisma
COPY --from=deps /app/node_modules ./node_modules

COPY --from=build /app/dist/src ./
CMD [ "/bin/sh", "/app/entrypoint.sh" ]
