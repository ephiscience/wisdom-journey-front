FROM node:24-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn prisma generate && yarn build
# Ici, l'application est compilée

FROM node:24-alpine AS deps
WORKDIR /app

COPY package.json yarn.lock prisma.config.ts ./
COPY prisma ./prisma
RUN yarn install --frozen-lockfile --production && yarn prisma generate

FROM node:24-alpine
EXPOSE 4000
WORKDIR /app

COPY package.json yarn.lock prisma.config.ts docker/entrypoint.sh ./
COPY prisma ./prisma
COPY --from=deps /app/node_modules ./node_modules

COPY --from=build /app/dist/src ./
CMD [ "/bin/sh", "/app/entrypoint.sh" ]
