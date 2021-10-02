import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const getQuizzes = (req: Request, res: Response) => {
  res.json("test");
};

export const createQuiz = (req: Request, res: Response) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.json("Quiz Created");
};
