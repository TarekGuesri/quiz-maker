/**
 * @jest-environment jsdom
 */

import { cleanup, render } from "@testing-library/react";
import { Loading } from ".";
import React from "react";

describe("src/components/loading/index.tsx", () => {
  afterEach(() => cleanup());

  test("Render Loading component", () => {
    const renderedComponent = render(<Loading />);

    expect(renderedComponent.container).toMatchSnapshot();
  });
});
