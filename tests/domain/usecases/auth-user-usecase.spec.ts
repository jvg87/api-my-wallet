import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { AuthUser, AuthUserParams, User } from "@/domain/entities";
import { IUserRepository } from "@/domain/protocols";
import { AuthUserUseCase } from "@/domain/usecases";

describe("AuthUser UseCase", () => {
  const user: User = {
    id: "user_id",
    email: "user_email@mail.com",
    name: "user_name",
    password: "user_password",
  };

  const authParams: AuthUserParams = {
    email: "user_email@mail.com",
    password: "user_password",
  };

  const authUser: AuthUser = {
    email: "user_email@mail.com",
    name: "user_name",
    token: "user_token",
  };

  const mockUserRepository: jest.Mocked<IUserRepository> = {
    checkByEmail: jest.fn(),
    create: jest.fn(),
    findByEmail: jest.fn(),
  };

  let sut: AuthUserUseCase;

  beforeAll(() => {
    mockUserRepository.findByEmail.mockResolvedValue(user);
  });

  beforeEach(() => {
    sut = new AuthUserUseCase(mockUserRepository);
  });

  it("Should call UserRepository.findByEmail with correct email ", async () => {
    const findByEmailSpy = jest.spyOn(mockUserRepository, "findByEmail");
    await sut.execute(authParams);
    expect(findByEmailSpy).toHaveBeenCalledWith(authParams.email);
  });
});
