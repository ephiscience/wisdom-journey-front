import fs from "fs";
import { join } from "path";
import { lexicographicSortSchema, printSchema } from "graphql";
import { schema } from "../schema";

fs.writeFileSync(
  join(__dirname, "..", "generated", "schema.graphql"),
  printSchema(lexicographicSortSchema(schema)) + "\n",
);
