import { defineConfig } from "prisma/config";

// Prisma 7 no longer loads .env automatically
try {
  process.loadEnvFile();
} catch {
  // no .env file (e.g. in Docker), rely on the environment
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
