import { cleanup } from "@testing-library/react";
import { store } from "src/redux/store";
import axios from "axios";
import {
  getQuizByCode,
  getQuizResult,
  setQuiz,
  nextQuestion,
  resetState,
} from "./quiz-slice";
import { Quiz } from "src/types";

jest.mock("axios");

describe("src/redux/quiz/quiz-slice.ts", () => {
  afterEach(() => cleanup());
  beforeEach(() => {
    store.dispatch(resetState());
  });

  test("getQuizByCode should make errorMessage as error response and 'Something unexpected happend!' when it's not defined", async () => {
    // Getting failed requestion with a repsonse value
    (axios as jest.Mocked<typeof axios>).get.mockRejectedValue({
      response: { data: "test" },
    });

    await store.dispatch(getQuizByCode("testCode"));

    expect(store.getState().quiz.errorMessage).toBe("test");

    (axios as jest.Mocked<typeof axios>).get.mockRejectedValue({});

    await store.dispatch(getQuizByCode("test"));

    expect(store.getState().quiz.errorMessage).toBe(
      "Something unexpected happend!",
    );
  });

  test("getQuizResult should set quizResult on successful request", async () => {
    // Setting the quiz
    await store.dispatch(setQuiz({ code: "test" } as Quiz));

    // Getting failed requestion without a repsonse value
    (axios as jest.Mocked<typeof axios>).post.mockResolvedValue({
      data: 50,
    });

    await store.dispatch(getQuizResult());

    expect(store.getState().quiz.quizResult).toBe(50);
  });

  test("getQuizResult should make errorMessage as error response and 'Something unexpected happend!' when it's not defined", async () => {
    // Setting the quiz
    await store.dispatch(setQuiz({ code: "test" } as Quiz));

    // Getting failed requestion with a repsonse value
    (axios as jest.Mocked<typeof axios>).post.mockRejectedValue({
      response: { data: "test" },
    });

    await store.dispatch(getQuizResult());

    expect(store.getState().quiz.errorMessage).toBe("test");

    // Getting failed requestion without a repsonse value
    (axios as jest.Mocked<typeof axios>).post.mockRejectedValue({});

    await store.dispatch(getQuizResult());

    expect(store.getState().quiz.errorMessage).toBe(
      "Something unexpected happend!",
    );
  });

  test("nextQuestion shouldn't change questionIndex when it's the last page", async () => {
    // Setting the quiz
    await store.dispatch(
      setQuiz({ questions: [{ id: "1" }, { id: " 2" }] } as Quiz),
    );

    expect(store.getState().quiz.questionIndex).toBe(0);

    await store.dispatch(nextQuestion());

    expect(store.getState().quiz.questionIndex).toBe(1);

    await store.dispatch(nextQuestion());

    expect(store.getState().quiz.questionIndex).toBe(1);
  });
});
