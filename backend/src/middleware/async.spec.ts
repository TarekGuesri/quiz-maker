import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "./async";
import { ErrorResponse } from "../utils/errorResponse";

const testFunction = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    const { status } = req.body;

    if (status === "success") {
      return res.status(200).json("Successful Request");
    }
    return next(new ErrorResponse("Unsuccessful Request", 404));
  },
);

const mockRequest = (body: unknown): Request => {
  const req = { body } as unknown as Request;

  return req;
};

const mockResponse = (): Response => {
  const res = {} as unknown as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("src/middleware/async.spec.ts", () => {
  test("Successful request should return the response", async () => {
    const req = mockRequest({ status: "success" });
    const res = mockResponse();
    const next = jest.fn();

    await testFunction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Successful Request");
  });
  test("Unsuccessful request should throw an error", async () => {
    const req = mockRequest({});
    const res = mockResponse();
    const next = jest.fn();

    await testFunction(req, res, next);

    const errorMessage = "Unsuccessful Request";
    const error = new Error(errorMessage);

    expect(next).toHaveBeenCalledWith(error);
  });
});
