import { AuthMiddleware } from "@/application/middlewares";
import { JwtAdapter } from "@/infra/adapters";
import { env } from "@/main/config/env";

export const makeAuthMiddleware = (): AuthMiddleware => {
  const KEY = env.secretKey;
  const EXPIRE_DATE = "7d";
  const decrypter = new JwtAdapter(KEY, EXPIRE_DATE);
  return new AuthMiddleware(decrypter);
};
