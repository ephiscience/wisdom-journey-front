import { server } from "./server";
import { context } from "./context";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { expressMiddleware } from "@as-integrations/express4";

async function main() {
  await server.start();

  const app = express();

  app.use(morgan("combined"));
  app.use(
    "/api",
    cors(),
    express.json(),
    expressMiddleware(server, { context: async () => context })
  );

  const httpServer = app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready`);
  });

  process.on("SIGTERM", () => {
    httpServer.close(() => {
      console.log("HTTP server closed");
    });
  });
}

main();
