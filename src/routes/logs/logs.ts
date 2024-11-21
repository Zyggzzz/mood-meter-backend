import { App, Log } from "../../index";
import { Stop } from "../../index";
import { Auth } from "../../verifyToken";
import dotenv from "dotenv";
import { logArray } from "../../index";

dotenv.config();

export default function Logs() {
  const auth = new Auth(process.env.API_KEY);
  App.get("/api/logs", async (req, res) => {
    if (!req.headers.authorization) return Stop(res, 401, "Unauthorized");

    if (!auth.validateApiKey(req)) {
      return Stop(res, 401, "Unauthorized");
    }

    Log("/api/logs", "get");

    res.json(logArray);
  });
}
