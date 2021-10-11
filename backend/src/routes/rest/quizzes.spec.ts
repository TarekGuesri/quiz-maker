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

  test("Testing createQuiz validation", async () => {
    // title can't be empty,
    // questions must be a an array of a length between 10 and 10
    // selectedAnswers must be an array of strings
    let response = await request(app).post("/rest/quizzes");

    console.log(response.body);

    let { errors } = response.body;

    expect(response.statusCode).toBe(400);

    expect(
      errors.find((error: { param: string }) => error.param === "title").msg,
    ).toBe("Title can't be empty!");
    expect(
      errors.find((error: { param: string }) => error.param === "questions")
        .msg,
    ).toBe("Questions must be an array of a length between 1 and 10!");
    expect(
      errors.find(
        (error: { param: string }) => error.param === "selectedAnswers",
      ).msg,
    ).toBe("Selected Answers must be an array of strings!");

    const formData = {
      title: "Test Quiz",
      questions: [
        {
          content: "",
          answers: [
            {
              text: "",
              isCorrect: false,
            },
            {
              text: "2",
              isCorrect: true,
            },
            {
              text: "3",
              isCorrect: false,
            },
            {
              text: "4",
              isCorrect: false,
            },
          ],
        },
      ],
      selectedAnswers: [" test"],
    };

    // question content can't be empty
    // answer text can't be empty
    response = await request(app).post("/rest/quizzes").send(formData);
    errors = [...response.body.errors];

    expect(response.statusCode).toBe(400);
    expect(
      errors.find(
        (error: { param: string }) => error.param === "questions[0].content",
      ).msg,
    ).toBe("Question content can't be empty!");
    expect(
      errors.find(
        (error: { param: string }) =>
          error.param === "questions[0].answers[0].text",
      ).msg,
    ).toBe("Answer's text can't be empty!");

    // Filling formData for a successfull request
    formData.questions[0].content = "Question 1";
    formData.questions[0].answers[0].text = "1";

    response = await request(app).post("/rest/quizzes").send(formData);
    expect(response.statusCode).toBe(200);
  });
});
