import { RequestHandler } from "express";

import { IController } from "@/application/protocols";

export const expressRouteAdapter = (
  controller: IController
): RequestHandler => {
  return async (req, res) => {
    const { statusCode, body } = await controller.handle({
      body: req.body,
      params: req.params,
      userId: req.userId,
    });

    res.status(statusCode).json(body);
  };
};
