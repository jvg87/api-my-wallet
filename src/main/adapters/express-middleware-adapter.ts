import { RequestHandler } from "express";

import { IMiddleware } from "@/application/protocols";

export const expressMiddlewareAdapter = (
  middleware: IMiddleware
): RequestHandler => {
  return async (req, res, next) => {
    const { statusCode, body } = await middleware.handle({
      headers: req.headers,
    });

    if (statusCode === 200) {
      req.userId = body?.data.userId;
      next();
    }

    res.status(statusCode).json(body);
  };
};
