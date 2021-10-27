import React from "react";
import { cleanup, render } from "@testing-library/react";
import { store } from "src/redux/store";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { QuizResult } from "./quiz-result";

describe("src/pages/quiz/quiz-result.tsx", () => {
  afterEach(() => cleanup());

  test("Render QuizResult component", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Theme>
          <QuizResult score={50} />
        </Theme>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
