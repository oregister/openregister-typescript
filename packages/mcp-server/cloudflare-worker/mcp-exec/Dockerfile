# Deno 2.7.1: the generated code-tool worker fails on 2.9's unix-socket net
# permission; Stainless's own MCP image pins the same version.
FROM denoland/deno:alpine-2.7.1

RUN apk add --no-cache nodejs npm

# The Deno image ships its own libgcc_s in /usr/local/lib that breaks Alpine's node.
ENV LD_LIBRARY_PATH=/usr/lib:/usr/local/lib

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY server.mjs warm.mjs ./

# Populate the Deno code cache; DENO_DIR is /deno-dir in the base image.
RUN node warm.mjs

RUN addgroup -g 1001 -S app && adduser -S app -u 1001 \
    && chown -R app:app /app /deno-dir

USER app

ENV PORT=3000
EXPOSE 3000

ENTRYPOINT ["node", "server.mjs"]
