import request from "supertest";
import { connectDB, disconnectDB } from "../../config/db";
import { app } from "../../app";

import Answer from "../../models/Answer";
import Question from "../../models/Question";
import Quiz from "../../models/Quiz";

import answers from "../../_data/answers.json";
import questions from "../../_data/questions.json";
import quizzes from "../../_data/quizzes.json";

describe("src/routes/rest/quizzes.ts", () => {
  // Setup connection to the database
  beforeAll(async () => {
    await connectDB();
    await Answer.create(answers);
    await Question.create(questions);
    await Quiz.create(quizzes);
  });
  afterAll(async () => {
    await Quiz.remove({});
    await Question.remove({});
    await Answer.remove({});

    disconnectDB();
  });

  test("getQuizzes should get a list of quizzes", async () => {
    const response = await request(app).get("/rest/quizzes");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(quizzes.length);
  });
});
