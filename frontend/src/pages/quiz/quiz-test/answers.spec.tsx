import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { store } from "src/redux/store";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { quizMock } from "src/__mocks__/quiz-mock";
import { Answers } from "./answers";

const answers = [...quizMock.questions[0].answers];

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
