import React from "react";
import axios from "axios";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { store } from "src/redux/store";

import { CreateQuizForm } from "./create-quiz-form";

jest.mock("axios");

describe("src/components/create-quiz-form.tsx", () => {
  afterEach(() => cleanup());

  test("Form should be empty on mount and remove question should be disabled", () => {
    render(
      <Provider store={store}>
        <Theme>
          <CreateQuizForm />
        </Theme>
      </Provider>,
    );

    // Quiz title
    const quizTitleInput = screen.getByTestId("quiz-title");
    expect(quizTitleInput).toHaveDisplayValue("");

    // Question content
    const questionContentInput = screen.getByTestId("question-content");
    expect(questionContentInput).toHaveDisplayValue("");

    // Answers' text
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`answer-text-${i}`)).toHaveDisplayValue("");
    }

    // Checking remove question button
    const removeQuestionButton = screen.getByRole("button", {
      name: /remove question/i,
    });

    expect(removeQuestionButton).toBeDisabled();
  });

  test("Form can't be submitted when fields are empty and get quizID when submitting", async () => {
    (axios as jest.Mocked<typeof axios>).post.mockResolvedValue({
      data: "test",
    });

    render(
      <Provider store={store}>
        <Theme>
          <CreateQuizForm />
        </Theme>
      </Provider>,
    );

    /*  Filling Form */

    // Quiz title
    const quizTitleInput = screen.getByTestId("quiz-title");
    fireEvent.change(quizTitleInput, { target: { value: "React Quiz" } });
    expect(quizTitleInput).toHaveDisplayValue("React Quiz");

    // Question content
    const questionContentInput = screen.getByTestId("question-content");
    fireEvent.change(questionContentInput, {
      target: { value: "First Question" },
    });
    expect(questionContentInput).toHaveDisplayValue("First Question");

    // Answers' text
    for (let i = 1; i <= 4; i++) {
      const answer = screen.getByTestId(`answer-text-${i}`);
      const answerText = `Answer ${i}`;

      fireEvent.change(answer, {
        target: { value: answerText },
      });
      expect(answer).toHaveDisplayValue(answerText);

      // Selecting 3rd answer
      if (i === 3) {
        const thirdAnswerRadio = screen.getByTestId("answer-radio-3");

        fireEvent.click(thirdAnswerRadio);

        expect(thirdAnswerRadio).toBeChecked();
      }
    }

    // Creating quiz
    const createButton = screen.getByRole("button", {
      name: /create quiz/i,
    });

    fireEvent.click(createButton);

    expect(createButton).toBeDisabled();

    await waitFor(() => screen.getByTestId("upload-button-loading-false"));

    expect(createButton).toBeEnabled();

    expect(store.getState().createQuiz.quizID).toEqual("test");
  });
});
