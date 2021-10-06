import { cleanup } from "@testing-library/react";
import { config, getEnv } from ".";
import { Environment } from "src/types";

describe("src/config/index.ts", () => {
  afterEach(() => cleanup());

  test("getEnv returns development when location.hostname is localhost", () => {
    expect(getEnv()).toBe<Environment>("development");
  });

  test("getEnv returns production when location.hostname is not localhost", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.location as any) = new URL("https://github.com/TarekGuesri");
    expect(getEnv()).toBe<Environment>("production");
  });

  test("config is defined", () => {
    expect(config).toBeDefined();
  });
});
