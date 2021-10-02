import { Router } from "express";
import { checkSchema } from "express-validator";
import { quizSchema } from "../../utils/validators";
import { getQuizzes, createQuiz } from "../../controllers/quizzes";

const quizzesRouter: Router = Router();

// @route GET quizzes/
// @desc Gets quizzes
// @access Public
quizzesRouter.get("/", getQuizzes);

// @route POST quizzes/
// @desc creates a quiz
// @access Public
quizzesRouter.post("/", checkSchema(quizSchema), createQuiz);

export = quizzesRouter;
