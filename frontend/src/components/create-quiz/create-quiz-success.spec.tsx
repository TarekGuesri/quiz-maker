/**
 * @jest-environment jsdom
 */

import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { store } from "src/redux/store";
import { config } from "src/config";

import { CreateQuizSuccess } from "./create-quiz-success";

describe("src/components/create-quiz-form-success.tsx", () => {
  afterEach(() => cleanup());

  test("Render CreateQuizSuccess component", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Theme>
          <CreateQuizSuccess quizID="test" />
        </Theme>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });

  test("The quiz url must have the same quizID from props", () => {
    const quizID = "test";

    render(
      <Provider store={store}>
        <Theme>
          <CreateQuizSuccess quizID={quizID} />
        </Theme>
      </Provider>,
    );

    const expectedQuizURL = `${config.frontend.url}/quiz/${quizID}`;

    screen.getByRole("link", {
      name: expectedQuizURL,
    });
  });
});
