/**
 * @jest-environment jsdom
 */

import { cleanup, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { store } from "src/redux/store";
import { history } from "src/utils/history";
import { Hero } from "./Hero";

describe("src/components/loading/Hero.tsx", () => {
  afterEach(() => cleanup());

  test("Render Loading component", () => {
    const renderedLoading = render(
      <Provider store={store}>
        <Router history={history}>
          <Theme>
            <Hero />
          </Theme>
        </Router>
      </Provider>,
    );

    expect(renderedLoading.container).toMatchSnapshot();
  });
});
