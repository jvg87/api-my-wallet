import { Router } from "express";

import { expressMiddlewareAdapter, expressRouteAdapter } from "@/main/adapters";
import {
  makeCreateBankAccountController,
  makeGetAllBankAccountsController,
  makeUpdateBankAccountController,
} from "@/main/factories";
import { makeAuthMiddleware } from "@/main/factories/middlewares";

export const bankAccountRoute = (router: Router) => {
  router.post(
    "/bank-accounts",
    expressMiddlewareAdapter(makeAuthMiddleware()),
    expressRouteAdapter(makeCreateBankAccountController())
  );

  router.get(
    "/bank-accounts",
    expressMiddlewareAdapter(makeAuthMiddleware()),
    expressRouteAdapter(makeGetAllBankAccountsController())
  );

  router.put(
    "/bank-accounts/:bankAccountId",
    expressMiddlewareAdapter(makeAuthMiddleware()),
    expressRouteAdapter(makeUpdateBankAccountController())
  );
};
