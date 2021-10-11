import request from "supertest";
import { connectDB, disconnectDB } from "../../config/db";
import { app } from "../../app";

describe("src/routes/rest/quizzes.ts", () => {
  // Setup connection to the database
  beforeAll(async () => await connectDB());
  afterAll((done) => {
    disconnectDB(done);
  });

  test("getQuizzes should get a list of quizzes", async () => {
    const response = await request(app).get("/rest/quizzes");

    expect(response.statusCode).toBe(200);
  });
});
