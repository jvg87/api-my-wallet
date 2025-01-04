import { Express, Router } from "express";

import { authUserRoutes, createUserRoute } from "@/main/routes";

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use(router);
  createUserRoute(router);
  authUserRoutes(router);
};
