# Precompresses the text assets so Caddy can serve them with
# `file_server { precompressed }` (Caddy can't encode brotli on the fly).
FROM alpine:3 AS compress

RUN apk add --no-cache brotli gzip zstd
COPY --from=src . /dist
RUN find /dist -type f \( \
        -name '*.html' -o -name '*.js' -o -name '*.mjs' -o -name '*.css' \
        -o -name '*.json' -o -name '*.webmanifest' -o -name '*.svg' \
        -o -name '*.txt' -o -name '*.xml' -o -name '*.ico' \
    \) -exec sh -c 'for f; do \
        brotli --best --keep --force "$f" && \
        zstd -19 --quiet --keep --force "$f" && \
        gzip -9 --keep --force "$f"; \
    done' sh {} +

FROM baseimage

COPY --from=compress /dist ./
