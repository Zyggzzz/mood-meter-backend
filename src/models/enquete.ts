import mongoose, { Model, Schema } from "mongoose";
import { Enquete } from "../types/enquete";

export const EnqueteSchema = new Schema<Enquete>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  residence: { type: String, required: true },
  age: { type: Date, required: true },
  prevEdu: { type: String, required: true },
  course: { type: String, required: true },
});

export const EnqueteModel: Model<Enquete> = mongoose.model<Enquete>("Enquete", EnqueteSchema);
