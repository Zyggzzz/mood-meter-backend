import express, { Response } from "express";
import Index from "./routes/api";

export const App = express();

async function Main() {
  Index();

  App.listen(80);
}

export function Stop(res: Response, status: number, error: string) {
  res.status(status).json({ error: error });
}

Main();
