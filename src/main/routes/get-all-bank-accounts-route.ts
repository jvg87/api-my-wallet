import { Router } from "express";

import { expressMiddlewareAdapter, expressRouteAdapter } from "@/main/adapters";
import { makeGetAllBankAccountsController } from "@/main/factories";
import { makeAuthMiddleware } from "@/main/factories/middlewares";

export const getAllBankAccountsRoute = (router: Router) => {
  router.get(
    "/bank-accounts",
    expressMiddlewareAdapter(makeAuthMiddleware()),
    expressRouteAdapter(makeGetAllBankAccountsController())
  );
};
