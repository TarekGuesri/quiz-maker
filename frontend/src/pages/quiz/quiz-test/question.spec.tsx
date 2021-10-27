import React from "react";
import { cleanup, render } from "@testing-library/react";
import { store } from "src/redux/store";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { Question } from "./question";

describe("src/pages/quiz/quiz-test/question.tsx", () => {
  afterEach(() => cleanup());

  test("Render Question component", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Theme>
          <Question content="Test Question" />
        </Theme>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
