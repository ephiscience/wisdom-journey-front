#!/usr/bin/env sh
set -e

./node_modules/.bin/prisma migrate deploy

exec node --unhandled-rejections=strict index.js
