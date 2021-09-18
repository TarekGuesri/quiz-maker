import { Router } from "express";
import { getQuizzes } from "../../controllers/quizzes";

const quizzesRouter: Router = Router();

// @route GET quizzes/
// @desc Gets quizzes
// @access Public
quizzesRouter.get("/", getQuizzes);

export = quizzesRouter;
