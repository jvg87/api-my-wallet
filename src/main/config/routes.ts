import { Express, Router } from "express";

import { bankAccountRoute, userRoute } from "@/main/routes";

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use(router);
  userRoute(router);
  bankAccountRoute(router);
};
