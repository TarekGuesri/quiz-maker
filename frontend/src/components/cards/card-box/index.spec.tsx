/**
 * @jest-environment jsdom
 */

import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Theme } from "src/components/theme";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { CardBox } from ".";

describe("src/components/cards/card-box/index.tsx", () => {
  afterEach(() => cleanup());

  test("Render CardBox component", () => {
    const renderedComponent = render(
      <Provider store={store}>
        <Theme>
          <CardBox>Test</CardBox>
        </Theme>
      </Provider>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
