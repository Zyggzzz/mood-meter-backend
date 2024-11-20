import * as mongoose from "mongoose";
import { Log } from ".";

export class Database {
  private static database: mongoose.Connection;

  public static async connect() {
    if (this.database) {
      return;
    }

    const database = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/`);

    if (!database) {
      Log("Database connection failed", "error");
      process.exit(1);
    }

    Log("Database connection successful", "info");

    this.database = mongoose.connection;
  }
}
