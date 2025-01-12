import { Router } from "express";

import { expressMiddlewareAdapter, expressRouteAdapter } from "@/main/adapters";
import { makeGetUserController } from "@/main/factories";
import { makeAuthMiddleware } from "@/main/factories/middlewares";

export const getUserRoute = (router: Router) => {
  router.get(
    "/me",
    expressMiddlewareAdapter(makeAuthMiddleware()),
    expressRouteAdapter(makeGetUserController())
  );
};
