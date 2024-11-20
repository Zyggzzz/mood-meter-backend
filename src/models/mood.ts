import mongoose, { Model, Schema } from "mongoose";
import { Mood } from "../types/mood";

export const MoodSchema = new Schema<Mood>({
  mood: { type: String, required: true },
  date: { type: Date, required: true },
});

export const MoodModel: Model<Mood> = mongoose.model<Mood>("Mood", MoodSchema);
