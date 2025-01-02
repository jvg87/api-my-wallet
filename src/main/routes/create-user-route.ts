import { Router } from "express";

import { expressRouteAdapter } from "@/main/adapters";
import { makeCreateUserController } from "@/main/factories";

export const createUserRoute = (router: Router) => {
  router.post("/users", expressRouteAdapter(makeCreateUserController()));
};
