import { Router } from "express";

// Importing routes
import quizzesRoute from "./rest/quizzes";

const restRouter: Router = Router();

// Quizzes
restRouter.use("/quizzes", quizzesRoute);

export = restRouter;
