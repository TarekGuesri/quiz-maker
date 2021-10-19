import { Request, Response, NextFunction } from "express";

interface AsyncMiddleware {
  (req: Request, res: Response, next: NextFunction): Promise<unknown>;
}

export const asyncHandler =
  (fn: AsyncMiddleware): AsyncMiddleware =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
