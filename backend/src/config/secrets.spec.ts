describe("src/utils/secrets.ts", () => {
  beforeEach(() => {
    // Disabling secrets file logs when not having process.env.NODE_ENV as "test"
    jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    process.env.NODE_ENV = "test";
  });

  test("Testing test environment", async () => {
    jest.resetModules();
    const secrets = await import("./secrets");

    expect(secrets.ENVIRONMENT).toBe("test");
  });

  test("Testing production environment", async () => {
    process.env.NODE_ENV = "production";

    jest.resetModules();
    const secrets = await import("./secrets");

    expect(secrets.ENVIRONMENT).toBe("production");
  });

  test("Testing development environment", async () => {
    // If process.env.NODE_ENV is neither production nor test, ENVIRONMENT should be produciton
    process.env.NODE_ENV = "";

    jest.resetModules();
    const secrets = await import("./secrets");

    expect(secrets.ENVIRONMENT).toBe("development");
  });

  test("MONGODB_URI should get the value from process.env", async () => {
    jest.resetModules();
    let secrets = await import("./secrets");

    expect(secrets.MONGODB_URI).toBeTruthy();

    process.env.MONGODB_URI_TEST = "";

    jest.resetModules();
    secrets = await import("./secrets");

    expect(secrets.MONGODB_URI).toBeFalsy();
  });
});
