import { Router } from "express";

// Importing routes
import { quizzesRouter } from "./rest/quizzes";

export const restRouter: Router = Router();

// Quizzes
restRouter.use("/quizzes", quizzesRouter);
