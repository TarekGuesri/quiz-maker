import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import { connectDB } from "./config/db";
import { restRouter } from "./routes/rest";
import { errorHandler } from "./middleware/error";

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

  app.use("/rest", limiter);
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

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")),
  );
}

app.use(errorHandler);
