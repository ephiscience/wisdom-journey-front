FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn
ADD . /app
RUN yarn run build --prod


FROM caddy:2-alpine
WORKDIR /app
ADD Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist/wisdom-journey-front/ ./
