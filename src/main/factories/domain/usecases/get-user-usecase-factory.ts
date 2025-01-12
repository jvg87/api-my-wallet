import { GetUserUseCase } from "@/domain/usecases";
import { PrismaUserRepository } from "@/infra/repositories";

export const makeGetUserUseCase = (): GetUserUseCase => {
  const userRepository = new PrismaUserRepository();
  return new GetUserUseCase(userRepository);
};
