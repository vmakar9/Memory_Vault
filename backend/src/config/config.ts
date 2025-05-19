import { config } from "dotenv";
config();
export const configs = {
  SUPABASE_URL: process.env.SUPABASE_URL || undefined,
  SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
  PORT: process.env.PORT,
  PG_HOST: process.env.PG_HOST,
  PG_PORT: process.env.PG_PORT || 5432,
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD,
  PG_DATABASE: process.env.PG_DATABASE,
};
