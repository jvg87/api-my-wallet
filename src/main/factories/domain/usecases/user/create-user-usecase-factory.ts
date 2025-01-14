import { CreateUserUseCase } from "@/domain/usecases";
import { BcryptAdapter } from "@/infra/adapters";
import { PrismaUserRepository } from "@/infra/repositories";

export const makeCreateUserUseCase = (): CreateUserUseCase => {
  const userRepository = new PrismaUserRepository();
  const hasher = new BcryptAdapter();
  const createUserUseCase = new CreateUserUseCase(userRepository, hasher);
  return createUserUseCase;
};
