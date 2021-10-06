import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { store } from "src/redux/store";

import { CreateQuizForm } from "./create-quiz-form";

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
    const answer1 = screen.getByTestId("answer-text-1");
    expect(answer1).toHaveDisplayValue("");

    const answer2 = screen.getByTestId("answer-text-2");
    expect(answer2).toHaveDisplayValue("");

    const answer3 = screen.getByTestId("answer-text-3");
    expect(answer3).toHaveDisplayValue("");

    const answer4 = screen.getByTestId("answer-text-4");
    expect(answer4).toHaveDisplayValue("");

    // Checking remove question button
    const removeQuestionButton = screen.getByRole("button", {
      name: /remove question/i,
    });

    expect(removeQuestionButton).toBeDisabled();
  });
});
