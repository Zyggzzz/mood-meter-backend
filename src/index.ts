import express, { Response } from "express";
import Index from "./routes/api";

export const App = express();

async function Main() {
  Index();

  const PORT = process.env.PORT || 3000;
  App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export function Stop(res: Response, status: number, error: string) {
  res.status(status).json({ error: error });
}

Main();
