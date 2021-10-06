/**
 * @jest-environment jsdom
 */

import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { store } from "src/redux/store";
import { history } from "src/utils/history";
import { Hero } from "./hero";

describe("src/pages/create-quiz/Hero.tsx", () => {
  afterEach(() => cleanup());

  test("Render Hero component", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Router history={history}>
          <Theme>
            <Hero />
          </Theme>
        </Router>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
