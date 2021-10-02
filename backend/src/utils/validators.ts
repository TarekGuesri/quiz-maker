import { Schema } from "express-validator";
import { trimmer } from "./helpers";

export const quizSchema: Schema = {
  title: {
    errorMessage: "Title can't be empty!",
    notEmpty: true,
  },
  questions: {
    isArray: { options: { min: 1, max: 10 } },
    errorMessage: "Questions must be an array of a length between 1 and 10!",
  },
  "questions.*.content": {
    errorMessage: "Question content can't be empty!",
    customSanitizer: {
      options: (value) => {
        return trimmer(value);
      },
    },
    notEmpty: true,
  },
  "questions.*.answers": {
    isArray: { options: { min: 4, max: 4 } },
    errorMessage: "Question answers must be an array of 4 answers!",
  },
  "questions.*.answers.*.text": {
    errorMessage: "Answer's text can't be empty!",
    customSanitizer: {
      options: (value) => {
        return trimmer(value);
      },
    },
    notEmpty: true,
  },
  selectedAnswers: {
    isArray: { options: { min: 1, max: 10 } },
    errorMessage: "Selected Answers must be an array of strings!",
  },
  "selectedAnswers.*": {
    errorMessage: "Selected answer can't be empty!",
    customSanitizer: {
      options: (value) => {
        return trimmer(value);
      },
    },
    notEmpty: true,
  },
};
