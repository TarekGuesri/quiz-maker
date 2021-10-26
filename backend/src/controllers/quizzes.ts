import { Request, Response } from "express";
import { validationResult } from "express-validator";
import shortid from "shortid";

import { asyncHandler } from "../middleware/async";
import Answer, { AnswerDocument } from "../models/Answer";
import Question, { QuestionDocument } from "../models/Question";
import Quiz from "../models/Quiz";

export const getQuizzes = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  const quizzes = await Quiz.find({}).populate({
    path: "questions",
    populate: {
      path: "answers",
    },
  });

  return res.json(quizzes);
};

export const getQuizByCode = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const quiz = await Quiz.findOne({ code: req.params.quizCode }).populate({
    path: "questions",
    populate: {
      path: "answers",
      select: "-isCorrect", // We hide the isCorrect field so the user can't know the correct answer from the frontend
    },
  });

  if (!quiz) {
    return res.status(404).json("Quiz not found!");
  }

  return res.json(quiz);
};

export const createQuiz = asyncHandler(async (req: Request, res: Response) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, questions, selectedAnswers } = req.body;

  // Looping through quesions
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // Looping through quesion's answers
    let { answers } = question;

    // If none of the answers was selected as the correct answer, we select the first one as the correct one
    let noSelectedAnswer = false;

    for (let j = 0; j < answers.length; j++) {
      const answer = answers[j];

      // If the selected answer id is included in the selectedAnswers array, we make it correct
      if (selectedAnswers.includes(answer.id)) {
        noSelectedAnswer = true;
        answers[j].isCorrect = true;
      }
    }

    if (!noSelectedAnswer) {
      answers[0].isCorrect = true;
    }

    // We create the answers
    answers = await Answer.create(answers);

    // We add the answers to the question
    questions[i].answers = [...answers];
  }

  const createdQuestions = await Question.create(questions);

  const code = shortid.generate();

  // Creating Quiz
  await Quiz.create({
    title,
    description,
    code,
    questions: createdQuestions,
  });

  return res.json(code);
});

export const getQuizResult = asyncHandler(
  async (req: Request, res: Response) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const quiz = await Quiz.findOne({ code: req.params.quizCode }).populate({
      path: "questions",
      populate: {
        path: "answers",
      },
    });

    if (!quiz) {
      return res.status(404).json("Quiz not found!");
    }

    const { selectedAnswers } = req.body;
    const { questions } = quiz;

    let correctAnswersCount = 0;

    questions.forEach((question: QuestionDocument, questionIndex: number) => {
      // We check if the selected answer equals one of the answers, if yes, we increment the correctAnswers count
      const { answers } = question;
      for (let index = 0; index < answers.length; index++) {
        const answer: AnswerDocument = answers[index];
        const isSelected = selectedAnswers[questionIndex] === answer.id;

        if (isSelected) {
          // If the selected answer is correct, we increase the count
          if (answer.isCorrect) {
            correctAnswersCount++;
          }

          break;
        }
      }
    });

    const score = Math.round((100 * correctAnswersCount) / questions.length);

    return res.json(score);
  },
);
