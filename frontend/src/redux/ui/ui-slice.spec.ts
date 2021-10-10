import { cleanup } from "@testing-library/react";
import { store } from "src/redux/store";
import { switchDarkMode } from "./ui-slice";

describe("src/redux/ui/ui-slice.ts", () => {
  afterEach(() => cleanup());
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
  });

  test("darkMode localStorage should be created after switching darkMode, and it should be the same value from state ", () => {
    expect(store.getState().ui.darkMode).toBe(false);

    // Switching to dark mode
    store.dispatch(switchDarkMode());

    // Both local storage and state should have darkMode on
    expect(store.getState().ui.darkMode).toBe(true);
    expect(localStorage.getItem("darkMode")).toBe("on");

    // Switching to light mode
    store.dispatch(switchDarkMode());

    // Both local storage and state should have darkMode off
    expect(store.getState().ui.darkMode).toBe(false);
    expect(localStorage.getItem("darkMode")).toBe("off");
  });
});
