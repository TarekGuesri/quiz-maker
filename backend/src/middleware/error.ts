import { ErrorRequestHandler } from "express";
import { ErrorResponse } from "../utils/errorResponse";

interface ErrorValue {
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  // console.error(err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors: ErrorValue = err.errors;

    const messages = Object.values(errors).map(
      (val: ErrorValue) => val.message,
    );

    error = new ErrorResponse(messages.join(". "), 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};
