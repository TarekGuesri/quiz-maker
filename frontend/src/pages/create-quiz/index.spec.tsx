import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { history } from "src/utils/history";
import { Theme } from "src/components/theme";
import { createQuizSuccess } from "src/redux/create-quiz/create-quiz-slice";
import CreateQuiz from ".";

describe("src/pages/create-quiz", () => {
  afterEach(() => cleanup());

  test("CreateQuiz renders a quiz creation form when quizID is empty and renders create-quiz-success when quizID is not empty", () => {
    const {
      createQuiz: { quizID },
    } = store.getState();

    expect(quizID).toEqual("");

    render(
      <Provider store={store}>
        <Router history={history}>
          <Theme>
            <CreateQuiz />
          </Theme>
        </Router>
      </Provider>,
    );

    expect(screen.getByText("Create a quiz")).toBeTruthy();

    store.dispatch(createQuizSuccess("test"));

    expect(screen.getByText("Your quiz has been created!")).toBeTruthy();
  });
});
