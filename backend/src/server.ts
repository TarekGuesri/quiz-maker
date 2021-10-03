import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-rate-limit";

import { connectDB } from "./config/db";

import restRoute from "./routes/rest";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Enabling cors
app.use(cors());

// Enabling helmet
app.use(helmet());

// Prevent http param pollution
app.use(hpp());

// Limiting each IP to 100 requests per windowMs
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

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
app.use("/rest", restRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(
    colors.yellow.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    ),
  ),
);
