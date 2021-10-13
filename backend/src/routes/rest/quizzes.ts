import { Router } from "express";
import { checkSchema } from "express-validator";
import { quizSchema } from "../../utils/validators";
import {
  getQuizzes,
  createQuiz,
  getQuizByCode,
} from "../../controllers/quizzes";

export const quizzesRouter: Router = Router();

// @route GET quizzes/
// @desc Gets quizzes
// @access Public
quizzesRouter.get("/", getQuizzes);

// @route POST quizzes/
// @desc creates a quiz
// @access Public
quizzesRouter.post("/", checkSchema(quizSchema), createQuiz);

// @route GET quizzes/:quizCode
// @desc Gets a quiz by code
// @access Public
quizzesRouter.get("/:quizCode", getQuizByCode);
