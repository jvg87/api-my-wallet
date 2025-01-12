import { GetUserController } from "@/application/controllers";
import { makeGetUserUseCase } from "@/main/factories/domain";

export const makeGetUserController = (): GetUserController => {
  return new GetUserController(makeGetUserUseCase());
};
