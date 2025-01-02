import { CreateUserController } from "@/application/controllers";
import { makeCreateUserUseCase } from "@/main/factories";

export const makeCreateUserController = (): CreateUserController => {
  const createUserUseCase = makeCreateUserUseCase();
  const createUserController = new CreateUserController(createUserUseCase);
  return createUserController;
};
