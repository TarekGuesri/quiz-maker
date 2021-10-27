import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { store } from "src/redux/store";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { Answers } from "./answers";

const answers = [
  { id: "1", text: "Answer 1" },
  { id: "2", text: "Answer 2" },
  { id: "3", text: "Answer 3" },
  { id: "4", text: "Answer 4" },
];

describe("src/pages/quiz/quiz-test/answers.tsx", () => {
  afterEach(() => cleanup());

  test("answer should be selected on click", async () => {
    const test = render(
      <Provider store={store}>
        <Theme>
          <Answers
            answers={answers}
            selectedAnswer={store.getState().quiz.selectedAnswers[0]}
          />
        </Theme>
      </Provider>,
    );

    const thirdAnswer = screen.getByTestId("answer-3");

    expect(store.getState().quiz.selectedAnswers[0]).not.toBe(answers[2].id);
    expect(thirdAnswer.className).not.toContain("selected");

    fireEvent.click(thirdAnswer);

    test.rerender(
      <Provider store={store}>
        <Theme>
          <Answers
            answers={answers}
            selectedAnswer={store.getState().quiz.selectedAnswers[0]}
          />
        </Theme>
      </Provider>,
    );

    expect(store.getState().quiz.selectedAnswers[0]).toBe(answers[2].id);
    expect(thirdAnswer.className).toContain("selected");
  });
});
