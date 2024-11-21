import { App, Log } from "../../index";
import { Stop } from "../../index";
import { Auth } from "../../verifyToken";
import dotenv from "dotenv";
import { EnqueteModel } from "../../models/enquete";
import { Enquete } from "../../types/enquete";
import dayjs from "dayjs";

dotenv.config();

export default function Enquete() {
  const auth = new Auth(process.env.API_KEY);
  App.get("/api/enquete", async (req, res) => {
    if (!req.headers.authorization) return Stop(res, 401, "Unauthorized");

    if (!auth.validateApiKey(req)) {
      return Stop(res, 401, "Unauthorized");
    }

    const result = await EnqueteModel.find();

    const formattedResult = result.map((item) => ({
      ...item.toObject(),
      age: dayjs(item.age).locale("nl").format("D MMMM YYYY"),
    }));

    if (!result) {
      return Stop(res, 404, "Not Found");
    }

    Log("/api/enquete", "get");

    res.json(formattedResult);
  });

  App.post("/api/enquete", async (req, res) => {
    if (!req.headers.authorization) return Stop(res, 401, "Unauthorized");

    if (!auth.validateApiKey(req)) {
      return Stop(res, 401, "Unauthorized");
    }

    const { name, address, residence, age, prevEdu, course } = req.body;

    if (!name || !address || !residence || !age || !prevEdu || !course) {
      return Stop(res, 400, "Bad Request");
    }

    try {
      const result = await EnqueteModel.create({
        name,
        address,
        residence,
        age,
        prevEdu,
        course,
      });

      Log("/api/enquete", "post");

      res.json({ message: "Enquete successfully created", result });
    } catch (error) {
      console.error(error);
      Stop(res, 500, "Internal Server Error");
    }
  });
}
