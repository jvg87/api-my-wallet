import { RequestHandler } from "express";

import { IController } from "@/application/protocols";

export const expressRouteAdapter = (
  controller: IController
): RequestHandler => {
  return async (req, res) => {
    const { statusCode, body } = await controller.handle({
      body: req.body,
    });

    res.status(statusCode).json(body);
  };
};
