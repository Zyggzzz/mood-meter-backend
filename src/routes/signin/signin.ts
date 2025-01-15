import { App, Log, Stop } from "../../index";
import { Auth } from "../../verifyToken";
import dotenv from "dotenv";
import { SignInModel } from "../../models/signin";

dotenv.config();
export default function signIn() {
  const auth = new Auth(process.env.API_KEY);

  App.post("/api/signin", async (req, res) => {
    if (!req.headers.authorization) {
      return Stop(res, 401, "Unauthorized");
    }
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return Stop(res, 400, "Username and password are required");
    }

    if (!auth.validateApiKey(req)) {
      return Stop(res, 401, "Unauthorized");
    }

    try {
      const info = await SignInModel.findOne({ username });

      if (!info) {
        return Stop(res, 404, "User not found");
      }

      Log("/api/signin", "post");

      if (password == info.password) {
        res.json({ message: "Login succesful" });
      } else {
        return Stop(res, 401, "Incorrect password");
      }
    } catch (error) {
      console.error("Error during signin:", error);
      return Stop(res, 500, "Internal server error");
    }
  });
}
