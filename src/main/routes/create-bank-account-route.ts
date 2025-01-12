import { Router } from "express";

import { expressMiddlewareAdapter, expressRouteAdapter } from "@/main/adapters";
import { makeCreateBankAccountController } from "@/main/factories";
import { makeAuthMiddleware } from "@/main/factories/middlewares";

export const createBankAccountRoute = (router: Router) => {
  router.post(
    "/bank-accounts",
    expressMiddlewareAdapter(makeAuthMiddleware()),
    expressRouteAdapter(makeCreateBankAccountController())
  );
};
