import mongoose, { Model, Schema } from "mongoose";
import { SignIn } from "../types/signin";

export const SignInSchema = new Schema<SignIn>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const SignInModel: Model<SignIn> = mongoose.model<SignIn>("Signin", SignInSchema);
