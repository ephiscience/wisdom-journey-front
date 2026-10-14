import SchemaBuilder from "@pothos/core";
import type { Context } from "../context";

export interface Root<T> {
  Context: T;
}

// Pothos v4 makes fields nullable by default, like nexus did
const builder = new SchemaBuilder<Root<Context>>({
  plugins: [],
});

builder.queryType({});

export { builder };
