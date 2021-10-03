import mongoose from "mongoose";
import { MONGODB_URI } from "../utils/secrets";

export const connectDB = async (): Promise<void> => {
  const conn = await mongoose.connect(MONGODB_URI || "");

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};
