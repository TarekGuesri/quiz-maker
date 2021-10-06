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
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`answer-text-${i}`)).toHaveDisplayValue("");
    }

    // Checking remove question button
    const removeQuestionButton = screen.getByRole("button", {
      name: /remove question/i,
    });

    expect(removeQuestionButton).toBeDisabled();
  });
});
