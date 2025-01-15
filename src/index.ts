import express, { Response } from "express";
import Index from "./routes/api";
import Enquete from "./routes/enquete/enquete";
import Mood from "./routes/mood/mood";
import Logs from "./routes/logs/logs";
import { corsOptions } from "./cors";
import cors from "cors";
import signIn from "./routes/signin/signin";
import { Database } from "./database";

export const App = express();

async function Main() {
  App.use(express.json(), cors(corsOptions));

  Database.connect();
  Index();
  Enquete();
  Mood();
  Logs();
  signIn();

  Log("Server started", "info");
  App.listen(1803);
}

export function Stop(res: Response, status: number, error: string) {
  Log(error, "error", status);
  res.status(status).json({ error: error });
}

export const logArray: { i: number; message: string; type: string; status?: number }[] = [];

let i = 0;
export function Log(message: string, type: string, status?: number) {
  logArray.push({ i, message, type, status });
  console.log(`[${type}] ${message}`);
  i++;
}

Main();
