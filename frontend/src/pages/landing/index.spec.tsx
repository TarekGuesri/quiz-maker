import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { history } from "src/utils/history";
import { Theme } from "src/components/theme";
import Landing from ".";

describe("src/pages/landing", () => {
  afterEach(() => cleanup());

  test("Render Landing component", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Router history={history}>
          <Theme>
            <Landing />
          </Theme>
        </Router>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
