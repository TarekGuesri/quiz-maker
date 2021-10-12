import mongoose from "mongoose";
import colors from "colors";
import { MONGODB_URI } from "./secrets";

// Disabling logs when doing testing
/* istanbul ignore else */
if (process.env.NODE_ENV === "test") {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = () => {};
}

export const connectDB = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const conn = await mongoose.connect(MONGODB_URI!);

  console.log(
    colors.cyan.underline.bold(`MongoDB Connected: ${conn.connection.host}`),
  );
};

export const disconnectDB = (): void => {
  mongoose.disconnect();
};
