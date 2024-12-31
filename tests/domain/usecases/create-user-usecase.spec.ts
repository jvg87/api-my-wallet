import { IHasher, IUserRepository } from "@/domain/protocols";
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

  const hasherStub: jest.Mocked<IHasher> = {
    hash: jest.fn(),
  };

  let sut: CreateUserUseCase;

  beforeAll(() => {
    userRepositoryStub.checkByEmail.mockResolvedValue(false);
  });

  beforeEach(() => {
    sut = new CreateUserUseCase(userRepositoryStub, hasherStub);
  });

  it("Should call UserRepository.checkByEmail with correct email ", async () => {
    const checkByEmailSpy = jest.spyOn(userRepositoryStub, "checkByEmail");
    await sut.execute(userParams);
    expect(checkByEmailSpy).toHaveBeenCalledWith(userParams.email);
  });

  it("Should return null if UserRepository.checkByEmail return true ", async () => {
    jest.spyOn(userRepositoryStub, "checkByEmail").mockResolvedValueOnce(true);
    const emailExists = await sut.execute(userParams);
    expect(emailExists).toBeFalsy();
  });

  it("Should throw if hash throws", async () => {
    jest
      .spyOn(userRepositoryStub, "checkByEmail")
      .mockRejectedValueOnce(new Error());
    const promise = sut.execute(userParams);
    await expect(promise).rejects.toThrow();
  });

  it("Should call hash with correct password ", async () => {
    const hashSpy = jest.spyOn(hasherStub, "hash");
    await sut.execute(userParams);
    expect(hashSpy).toHaveBeenCalledWith(userParams.password, 12);
  });

  it("Should throw if hash throws", async () => {
    jest.spyOn(hasherStub, "hash").mockRejectedValueOnce(new Error());
    const promise = sut.execute(userParams);
    await expect(promise).rejects.toThrow();
  });
});
