import { App } from "../../index";
import { Stop } from "../../index";
import { Auth } from "../../verifyToken";
import dotenv from "dotenv";
import { MoodModel } from "../../models/mood";
import { Mood } from "../../types/mood";
import dayjs from "dayjs";

dotenv.config();

export default function Mood() {
  const auth = new Auth(process.env.API_KEY);
  App.get("/api/mood", async (req, res) => {
    if (!req.headers.authorization) return Stop(res, 401, "Unauthorized");

    if (!auth.validateApiKey(req)) {
      return Stop(res, 401, "Unauthorized");
    }

    const result = await MoodModel.find();

    const formattedResult = result.map((item) => ({
      ...item.toObject(),
      date: dayjs(item.date).locale("nl").format("D MMMM YYYY HH:mm"),
    }));

    res.json(formattedResult);
  });

  App.post("/api/mood", async (req, res) => {
    if (!req.headers.authorization) return Stop(res, 401, "Unauthorized");

    if (!auth.validateApiKey(req)) {
      return Stop(res, 401, "Unauthorized");
    }

    const { mood } = req.body;

    if (!mood) {
      return Stop(res, 400, "Bad Request");
    }

    const formatDateForNetherlands = (date: Date): string => {
      return dayjs(date).locale("nl").format("D MMMM YYYY HH:mm");
    };

    const formattedDate = formatDateForNetherlands(new Date());

    console.log(formattedDate);
    try {
      const result = await MoodModel.create({
        mood: mood,
        date: formattedDate,
      });

      res.json({ message: "Mood successfully created", result });
    } catch (error) {
      console.error(error);
      Stop(res, 500, "Internal Server Error");
    }
  });
}
