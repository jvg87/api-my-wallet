import { Express, Router } from "express";

import {
  authUserRoutes,
  createBankAccountRoute,
  createUserRoute,
  getAllBankAccountsRoute,
  getUserRoute,
} from "@/main/routes";

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use(router);
  createUserRoute(router);
  authUserRoutes(router);
  getUserRoute(router);
  createBankAccountRoute(router);
  getAllBankAccountsRoute(router);
};
