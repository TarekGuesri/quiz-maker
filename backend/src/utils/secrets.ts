import dotenv from "dotenv";
import fs from "fs";
import { Environment } from "../types/index";

const DB_URI_VARS = ["MONGODB_URI", "MONGODB_URI_DEV", "MONGODB_URI_TEST"];

// Getting env variables from .env files
if (fs.existsSync(".env")) {
  console.log("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  console.log("Using .env.example file to supply config environment variables");
  dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}

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
