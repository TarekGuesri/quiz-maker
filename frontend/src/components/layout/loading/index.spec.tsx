/**
 * @jest-environment jsdom
 */
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Loading } from ".";
import { Theme } from "src/components/theme";

describe("src/components/loading/index.tsx", () => {
  afterEach(() => cleanup());

  test("Render Loading component", () => {
    const renderedComponent = render(
      <Theme>
        <Loading />
      </Theme>,
    );

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
