import { AuthUserController } from "@/application/controllers";
import { makeAuthUserUseCase } from "@/main/factories/domain";

export const makeAuthUserController = (): AuthUserController => {
  const authUserUseCase = makeAuthUserUseCase();
  const authController = new AuthUserController(authUserUseCase);
  return authController;
};
