import express, { Response } from "express";
import Index from "./routes/api";
import Enquete from "./routes/enquete/enquete";
import Mood from "./routes/mood/mood";
import { Database } from "./database";

export const App = express();

async function Main() {
  App.use(express.json());

  Database.connect();
  Index();
  Enquete();
  Mood();

  App.listen(80);
}

export function Stop(res: Response, status: number, error: string) {
  res.status(status).json({ error: error });
}

export function Log(message: string, type: string) {
  console.log(`[${type}] ${message}`);
}

Main();
