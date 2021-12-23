/**
 * @jest-environment jsdom
 */

import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Theme } from "src/components/theme";
import { store } from "src/redux/store";
import NotFound from ".";

describe("src/pages/not-found/index.tsx", () => {
  afterEach(() => cleanup());

  test("Render NotFound component", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Theme>
          <NotFound />
        </Theme>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
