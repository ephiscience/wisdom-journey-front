# Wisdom Journey

A pnpm workspace (`apps/*`, `packages/*`) whose tasks are run with [mise](https://mise.jdx.dev) in [monorepo mode](https://mise.jdx.dev/tasks/monorepo.html). Each project's tasks live in its own `mise.toml`.

| Project       | What it is                                                     |
| ------------- | -------------------------------------------------------------- |
| `apps/front`  | Angular front (served by Caddy in production)                  |
| `apps/server` | GraphQL API (Apollo Server, Pothos, Prisma on PostgreSQL)      |

Shared Docker tooling (bake CI helpers, the Caddy base image) lives in `common/docker`.

## Setup

```sh
mise install
mise run install
```

## Common tasks

| Command                                         | What it does                                                    |
| ----------------------------------------------- | --------------------------------------------------------------- |
| `mise run dev`                                  | Start the server and the front in watch mode                    |
| `mise run gen`                                  | Run every code generator (Prisma client)                        |
| `mise run lint`                                 | Lint every project                                              |
| `mise run test`                                 | Run every project's tests                                       |
| `mise run build`                                | Build every project                                             |
| `mise run bake`                                 | Build every Docker image                                        |
| `mise run //apps/server:prisma migrate dev`     | Run the Prisma CLI against the development database             |
| `mise run //apps/server:gen:schema`             | Print the GraphQL schema to `apps/server/src/generated`         |
| `mise run //apps/front:i18n`                    | Extract the front's i18n messages                               |

`mise tasks --all` lists every task. A single project's task is run as `mise run //apps/front:build`.
