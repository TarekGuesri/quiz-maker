import mongoose from "mongoose";
import colors from "colors";
import { MONGODB_URI } from "./secrets";

export const connectDB = async (): Promise<void> => {
  const conn = await mongoose.connect(MONGODB_URI || "");

  if (process.env.NODE_ENV !== "test") {
    console.log(
      colors.cyan.underline.bold(`MongoDB Connected: ${conn.connection.host}`),
    );
  }
};

export const disconnectDB = (): void => {
  mongoose.disconnect();
};
