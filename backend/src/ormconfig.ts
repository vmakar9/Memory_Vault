import { DataSource } from "typeorm";

import { configs } from "./config/config";
import { Vault } from "./models/messages.model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: configs.PG_HOST,
  port: +configs.PG_PORT || 5432,
  username: configs.PG_USER,
  password: configs.PG_PASSWORD,
  database: configs.PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Vault],
  migrations: [],
  subscribers: [],
});
