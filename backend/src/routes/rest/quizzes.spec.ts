import request from "supertest";
import { connectDB, disconnectDB } from "../../config/db";
import { app } from "../../app";

import Answer from "../../models/Answer";
import Question from "../../models/Question";
import Quiz from "../../models/Quiz";

import answers from "../../_data/answers.json";
import questions from "../../_data/questions.json";
import quizzes from "../../_data/quizzes.json";

import { formData } from "./mockData";

describe("src/routes/rest/quizzes.ts", () => {
  // Setup connection to the database
  beforeAll(async () => {
    await connectDB();

    await Answer.create(answers);
    await Question.create(questions);
    await Quiz.create(quizzes);
  });
  afterAll(async () => {
    await Quiz.deleteMany({});
    await Question.deleteMany({});
    await Answer.deleteMany({});

    disconnectDB();
  });

  test("getQuizzes should get a list of quizzes", async () => {
    const response = await request(app).get("/rest/quizzes");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(quizzes.length);
  });

  test("getQuizByCode should return a quiz, it if it doesn't exist, return error message", async () => {
    // Testing successfull request
    let testCode = "3SyiBUdNd";
    let response = await request(app).get(`/rest/quizzes/${testCode}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(testCode);

    // Testing not found
    testCode = "test";
    response = await request(app).get("/rest/quizzes/test");
    expect(response.statusCode).toBe(404);
    expect(response.body).toBe("Quiz not found!");
  });

  test("createQuiz validation", async () => {
    // title can't be empty,
    // questions must be a an array of a length between 10 and 10
    // selectedAnswers must be an array of strings
    let response = await request(app).post("/rest/quizzes");

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
      description: "Description",
      questions: [
        {
          content: "",
          answers: [
            {
              text: "",
            },
            {
              text: "2",
            },
            {
              text: "3",
            },
            {
              text: "4",
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

  test("createQuiz should return quiz code on a successful success, and if a question doesn't have an answer in the selected answers array, the first answer should be correct by default", async () => {
    const response = await request(app).post("/rest/quizzes").send(formData);

    expect(response.statusCode).toBe(200);
    const quizCode = response.body;
    // repsonse should return a string of quiz code
    expect(typeof quizCode).toBe("string");

    // We get the quiz by code from database and check if it has the same title
    const createdQuiz = await Quiz.findOne({ code: quizCode }).populate({
      path: "questions",
      populate: {
        path: "answers",
      },
    });

    expect(createdQuiz).toBeTruthy();
    expect(createdQuiz?.title).toBe(formData.title);

    // Answer 3 and 5 should be correct
    expect(createdQuiz?.questions[0].answers[2].isCorrect).toBe(true);
    expect(createdQuiz?.questions[1].answers[0].isCorrect).toBe(true);
  });

  test("getQuizResult should return validation error when no selected Answers were sent, and not found when quiz doesn't exist", async () => {
    // Validation errors
    let response = await request(app).post("/rest/quizzes/result/test");
    const { errors } = response.body;

    expect(response.statusCode).toBe(400);
    expect(
      errors.find(
        (error: { param: string }) => error.param === "selectedAnswers",
      ).msg,
    ).toBe("Selected answers must be an array");

    // Not found
    const formData = {
      selectedAnswers: [],
    };
    response = await request(app)
      .post("/rest/quizzes/result/test")
      .send(formData);
    expect(response.statusCode).toBe(404);
    expect(response.body).toBe("Quiz not found!");
  });

  test("getQuizResult score", async () => {
    // Testing correct answers
    let formData = {
      selectedAnswers: ["61645346dfd4aef3b10ee40c"],
    };
    let response = await request(app)
      .post("/rest/quizzes/result/Cwm1QqX3E")
      .send(formData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(100);

    // Testing wrong answers
    formData = {
      selectedAnswers: ["61645346dfd4aef3b10ee40d"],
    };
    response = await request(app)
      .post("/rest/quizzes/result/Cwm1QqX3E")
      .send(formData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(0);
  });
});
