import express, { Response } from "express";
import Index from "./routes/api";
import Enquete from "./routes/enquete/enquete";
import Mood from "./routes/mood/mood";
import { Database } from "./database";
import Logs from "./routes/logs/logs";
import { corsOptions } from "./cors";
import cors from "cors";

export const App = express();

async function Main() {
  App.use(express.json());
  App.use(cors(corsOptions));

  Database.connect();
  Index();
  Enquete();
  Mood();
  Logs();

  Log("Server started", "info");
  App.listen(1803);
}

export function Stop(res: Response, status: number, error: string) {
  Log(error, "error", status);
  res.status(status).json({ error: error });
}

export const logArray: { message: string; type: string; status?: number }[] = [];

export function Log(message: string, type: string, status?: number) {
  logArray.push({ message, type, status });
  console.log(`[${type}] ${message}`);
}

Main();
