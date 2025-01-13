import { Router } from "express";

import { expressMiddlewareAdapter, expressRouteAdapter } from "@/main/adapters";
import {
  makeAuthUserController,
  makeCreateUserController,
  makeGetUserController,
} from "@/main/factories";
import { makeAuthMiddleware } from "@/main/factories/middlewares";

export const userRoute = (router: Router) => {
  router.post("/users", expressRouteAdapter(makeCreateUserController()));
  router.post("/auth", expressRouteAdapter(makeAuthUserController()));
  router.get(
    "/me",
    expressMiddlewareAdapter(makeAuthMiddleware()),
    expressRouteAdapter(makeGetUserController())
  );
};
