import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { store } from "src/redux/store";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { setQuiz, resetState } from "src/redux/quiz/quiz-slice";
import { quizMock } from "src/__mocks__/quiz-mock";
import { QuizTest } from "./index";

describe("src/pages/quiz/quiz-test/index.tsx", () => {
  afterEach(() => cleanup());
  beforeEach(() => {
    store.dispatch(resetState());
  });

  test("Next button should be disabled when no option is selected", async () => {
    store.dispatch(setQuiz(quizMock));

    render(
      <Provider store={store}>
        <Theme>
          <QuizTest />
        </Theme>
      </Provider>,
    );

    const { selectedAnswers, questionIndex } = store.getState().quiz;

    expect(selectedAnswers[questionIndex]).toBeFalsy();

    const nextButton = screen.getByRole("button", {
      name: /next/i,
    });

    expect(nextButton).toBeDisabled();

    // When selecting an answer, it should be enabled
    const firstAnswer = screen.getByTestId("answer-1");
    fireEvent.click(firstAnswer);

    expect(nextButton).toBeEnabled();

    // Clicking next should advance to the next question
    fireEvent.click(nextButton);
    expect(screen.queryByText(quizMock.questions[1].content)).not.toBeNull();
  });

  test("Submit button should be disabled when no option is selected", async () => {
    store.dispatch(setQuiz(quizMock));

    render(
      <Provider store={store}>
        <Theme>
          <QuizTest />
        </Theme>
      </Provider>,
    );

    const { selectedAnswers, questionIndex } = store.getState().quiz;

    expect(selectedAnswers[questionIndex]).toBeFalsy();

    const nextButton = screen.getByRole("button", {
      name: /next/i,
    });
    const firstAnswer = screen.getByTestId("answer-1");

    // We get to the last question so the next button appears
    for (let i = 1; i <= 9; i++) {
      fireEvent.click(firstAnswer);
      fireEvent.click(nextButton);
    }

    const submitButton = screen.getByRole("button", {
      name: /submit/i,
    });
    expect(submitButton).toBeDisabled();

    // After selecting an option it should be enabled
    fireEvent.click(firstAnswer);
    expect(submitButton).toBeEnabled();

    // It should submit after clicking
    expect(store.getState().quiz.isSubmitting).toBe(false);
    fireEvent.click(nextButton);
    expect(store.getState().quiz.isSubmitting).toBe(true);
  });
});
