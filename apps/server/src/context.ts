import { db } from "./db";
import { PrismaClient } from "./generated/prisma/client";

export interface Context {
  db: PrismaClient;
}

export const context = {
  db,
};
