import { ENVIRONMENT } from "./secrets";

describe("src/utils/secrets.ts", () => {
  test("Testing test environment", () => {
    expect(ENVIRONMENT).toBe("test");
  });

  test("Testing production  environment", () => {
    jest.resetModules();
    process.env.NODE_ENV = "production";

    import("./secrets").then((secrets) => {
      const { ENVIRONMENT } = secrets;

      expect(ENVIRONMENT).toBe("production");
    });
  });
});
