import { AuthUserUseCase } from "@/domain/usecases";
import { BcryptAdapter, JwtAdapter } from "@/infra/adapters";
import { PrismaUserRepository } from "@/infra/repositories";
import { env } from "@/main/config/env";

export const makeAuthUserUseCase = (): AuthUserUseCase => {
  const userRepo = new PrismaUserRepository();
  const hashCompare = new BcryptAdapter();
  const encrypter = new JwtAdapter(env.secretKey, "7d");
  const authUserUserCase = new AuthUserUseCase(
    userRepo,
    hashCompare,
    encrypter
  );
  return authUserUserCase;
};
