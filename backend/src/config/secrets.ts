import dotenv from "dotenv";
import { Environment } from "../types/index";

// Disabling logs when doing testing
if (process.env.NODE_ENV === "test") {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.error = () => {};
}

const DB_URI_VARS = ["MONGODB_URI", "MONGODB_URI_DEV", "MONGODB_URI_TEST"];

dotenv.config({ path: ".env" });

// Environment getter
export const getEnv: () => Environment = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return "production";
    case "test":
      return "test";
    default:
      return "development";
  }
};

/** 
  Getting environment 
  */
const environments: Environment[] = ["production", "development", "test"];
// Environment index
const e = environments.indexOf(getEnv());
export const ENVIRONMENT = environments[e];

/** 
  Getting MONGODB_URI 
  */
export const MONGODB_URI = process.env[DB_URI_VARS[e]];

if (!MONGODB_URI) {
  console.error(
    `No mongo connection string. Set ${DB_URI_VARS[e]} environment variable.`,
  );
}
