import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { store } from "src/redux/store";
import { history } from "src/utils/history";

import { LandingPage, CreateQuizPage } from "./page-list-async";

describe("src/pages/page-list-async.spec.tsx", () => {
  afterEach(() => cleanup());

  test("LandingPage renders", async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Theme>
            <LandingPage />
          </Theme>
        </Router>
      </Provider>,
    );

    expect(await screen.findByText(/welcome to/i)).toBeTruthy();
  });

  test("CreateQuizPage renders", async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Theme>
            <CreateQuizPage />
          </Theme>
        </Router>
      </Provider>,
    );

    expect(await screen.findByText(/create a quiz/i)).toBeTruthy();
  });
});
