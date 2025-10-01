// src/lib/db.ts
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http"; // serverless, HTTP driver

const connectionString = process.env.DATABASE_URL!;
const client = neon(connectionString);

export const db = drizzle(client);
