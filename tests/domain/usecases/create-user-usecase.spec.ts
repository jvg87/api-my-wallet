import { IUserRepository } from "@/domain/protocols";
import { CreateUserUseCase } from "@/domain/usecases";

import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { UserParams } from "../entities";

describe("CreateUser UseCase", () => {
  const userParams: UserParams = {
    email: "user_email@mail.com",
    password: "user_password",
  };

  const userRepositoryStub: jest.Mocked<IUserRepository> = {
    checkByEmail: jest.fn(),
  };

  let sut: CreateUserUseCase;

  beforeAll(() => {
    userRepositoryStub.checkByEmail.mockResolvedValue(false);
  });

  beforeEach(() => {
    sut = new CreateUserUseCase(userRepositoryStub);
  });

  it("Should call UserRepository.checkByEmail with correct email ", async () => {
    const checkByEmailSpy = jest.spyOn(userRepositoryStub, "checkByEmail");
    await sut.execute(userParams);
    expect(checkByEmailSpy).toHaveBeenCalledWith(userParams.email);
  });
});
