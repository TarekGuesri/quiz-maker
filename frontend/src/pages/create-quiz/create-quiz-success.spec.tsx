/**
 * @jest-environment jsdom
 */

import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { store } from "src/redux/store";
import { config } from "src/config";

import { CreateQuizSuccess } from "./create-quiz-success";
import { createQuizSuccess } from "src/redux/create-quiz/create-quiz-slice";

describe("src/components/create-quiz-success.tsx", () => {
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

  test("quizID from redux becomes empty when clicking create another quiz button", () => {
    store.dispatch(createQuizSuccess("test"));

    const {
      createQuiz: { quizID },
    } = store.getState();

    expect(quizID).toEqual("test");

    render(
      <Provider store={store}>
        <Theme>
          <CreateQuizSuccess quizID={quizID} />
        </Theme>
      </Provider>,
    );

    const createButton = screen.getByRole("button", {
      name: /create another quiz/i,
    });

    fireEvent.click(createButton);

    expect(store.getState().createQuiz.quizID).toEqual("");
  });
});
