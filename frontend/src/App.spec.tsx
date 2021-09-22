import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

describe("src/entry/app.tsx", () => {
  afterEach(() => cleanup());
  test("Render App component", () => {
    const renderedApp = render(
      <Router>
        <App />
      </Router>,
    );
    expect(renderedApp.container).toMatchSnapshot();
  });
});
