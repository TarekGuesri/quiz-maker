import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { store } from "src/redux/store";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { Progress } from "./progress";

describe("src/pages/quiz/quiz-test/progress.tsx", () => {
  afterEach(() => cleanup());

  test("Render Progress component", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Theme>
          <Progress currentQuestion={2} totalQuestions={4} />
        </Theme>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });

  test("progress values", () => {
    const test = render(
      <Provider store={store}>
        <Theme>
          <Progress currentQuestion={2} totalQuestions={4} />
        </Theme>
      </Provider>,
    );

    const progressText = screen.getByTestId("progress-text");
    expect(progressText.textContent).toContain("2/4");

    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar.getAttribute("aria-valuenow")).toBe("50");

    test.rerender(
      <Provider store={store}>
        <Theme>
          <Progress currentQuestion={3} totalQuestions={4} />
        </Theme>
      </Provider>,
    );

    expect(progressText.textContent).toContain("3/4");
    expect(progressBar.getAttribute("aria-valuenow")).toBe("75");
  });
});
