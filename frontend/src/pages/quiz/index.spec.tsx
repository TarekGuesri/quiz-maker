import React from "react";
import axios from "axios";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { store } from "src/redux/store";
import { Router } from "react-router-dom";
import { history } from "src/utils/history";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { setQuiz, resetState } from "src/redux/quiz/quiz-slice";
import { quizMock } from "src/__mocks__/quiz-mock";
import Quiz from ".";

jest.mock("axios");

describe("src/pages/quiz/index.tsx", () => {
  afterEach(() => cleanup());
  beforeEach(() => {
    store.dispatch(resetState());
  });

  test("displaying 'Wrong link or quiz has been deleted!' when error message is 'Quiz not found!'", async () => {
    const errorMessage = "Quiz not found!";

    // Checking failed request
    (axios as jest.Mocked<typeof axios>).get.mockRejectedValue({
      response: { data: errorMessage },
    });

    const renderedComponent = render(
      <Provider store={store}>
        <Router history={history}>
          <Theme>
            <Quiz />
          </Theme>
        </Router>
      </Provider>,
    );

    await waitFor(() =>
      expect(screen.queryByText(errorMessage)).not.toBeNull(),
    );

    expect(
      screen.queryByText(/wrong link or quiz has been deleted!/i),
    ).not.toBeNull(),
      expect(renderedComponent.container).toMatchSnapshot();
  });
});
