import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeAuthUserController } from "../factories";

export const authUserRoutes = (router: Router) => {
  router.post("/auth", expressRouteAdapter(makeAuthUserController()));
};
