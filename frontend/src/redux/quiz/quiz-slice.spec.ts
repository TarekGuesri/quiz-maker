import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { store } from "src/redux/store";
import axios from "axios";
import { getQuizByCode, getQuizResult, resetState } from "./quiz-slice";

jest.mock("axios");

describe("src/redux/quiz/quiz-slice.ts", () => {
  afterEach(() => cleanup());
  beforeEach(() => {
    store.dispatch(resetState());
  });

  test("getQuizByCode should give 'Something unexpected happened' when error has no response", async () => {
    // Getting failed requestion without a repsonse value
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
});
