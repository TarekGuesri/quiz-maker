/**
 * @jest-environment jsdom
 */

import React from "react";
import { cleanup, render } from "@testing-library/react";
import App from "./app";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { store } from "src/redux/store";
import { history } from "src/utils/history";

describe("src/app.tsx", () => {
  afterEach(() => cleanup());
  test("Render App component", () => {
    const renderedApp = render(
      <Provider store={store}>
        <Router history={history}>
          <Theme>
            <App />
          </Theme>
        </Router>
      </Provider>,
    );
    expect(renderedApp.container).toMatchSnapshot();
  });
});
