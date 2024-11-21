import gatherEndpoints from "../gatherEndpoints";
import { App, Log } from "../index";
import { Stop } from "../index";
import { Auth } from "../verifyToken";
import dotenv from "dotenv";

dotenv.config();

export default function Index() {
  const auth = new Auth(process.env.API_KEY);
  App.get("/api", (req, res) => {
    if (!req.headers.authorization) return Stop(res, 401, "Unauthorized");

    if (!auth.validateApiKey(req)) {
      return Stop(res, 401, "Unauthorized");
    }

    Log("/api", "get");

    res.json(gatherEndpoints());
  });
}
