import { Express, Router } from "express";

import { createUserRoute } from "@/main/routes";

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use(router);
  createUserRoute(router);
};
