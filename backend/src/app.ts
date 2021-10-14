import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-rate-limit";

import { connectDB } from "./config/db";
import { restRouter } from "./routes/rest";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

export const app = express();

// Enabling cors
app.use(cors());

// Enabling helmet
app.use(helmet());

// Prevent http param pollution
app.use(hpp());

// Limiting each IP to 100 requests per windowMs

if (process.env.NODE_ENV === "prodcution") {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  });

  app.use(limiter);
}

// Sanitize data
app.use(mongoSanitize());

// body parsing middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Defining Routes
app.use("/rest", restRouter);
