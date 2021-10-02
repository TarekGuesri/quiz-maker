import { Schema } from "express-validator";

export const quizSchema: Schema = {
  title: {
    // isLength: { errorMessage: "Title can't be empty", options: { min: 1 } },
    errorMessage: "Title can't be empty!",
    notEmpty: true,
  },
  questions: {
    isArray: { options: { min: 1, max: 10 } },
    errorMessage: "Questions must be an array of a length between 1 and 10!",
  },
  "questions.*.content": {
    errorMessage: "Question content can't be empty!",
    notEmpty: true,
  },
};
