import mongoose from "mongoose";
import colors from "colors";
import { MONGODB_URI } from "../utils/secrets";

export const connectDB = async (): Promise<void> => {
  const conn = await mongoose.connect(MONGODB_URI || "");

  console.log(
    colors.cyan.underline.bold(`MongoDB Connected: ${conn.connection.host}`),
  );
};
