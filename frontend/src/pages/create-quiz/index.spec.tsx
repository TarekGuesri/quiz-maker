import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { history } from "src/utils/history";
import CreateQuiz from ".";
import { Theme } from "src/components/theme";

describe("src/pages/create-quiz", () => {
  afterEach(() => cleanup());

  test("CreateQuiz renders a quiz creation form when quizID is empty", () => {
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
  });
});
