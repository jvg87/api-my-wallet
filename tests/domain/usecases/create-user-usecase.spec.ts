import { User, UserParams } from "@/domain/entities";
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

describe("CreateUser UseCase", () => {
  const userParams: UserParams = {
    email: "any_email@mail.com",
    name: "any_name",
    password: "any_password",
  };

  const newUser: User = {
    id: "user_id",
    email: "user_email@mail.com",
    name: "user_name",
    password: "user_password",
  };

  const userRepositoryStub: jest.Mocked<IUserRepository> = {
    checkByEmail: jest.fn(),
    create: jest.fn(),
  };

  const hasherStub: jest.Mocked<IHasher> = {
    hash: jest.fn(),
  };

  let sut: CreateUserUseCase;

  beforeAll(() => {
    userRepositoryStub.checkByEmail.mockResolvedValue(false);
    userRepositoryStub.create.mockResolvedValue(newUser);
    hasherStub.hash.mockResolvedValue("hashed_password");
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

  it("Should throw if UserRepository.checkByEmail throws", async () => {
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

  it("Should call UserRepository.create with correct values ", async () => {
    const checkByEmailSpy = jest.spyOn(userRepositoryStub, "create");
    await sut.execute(userParams);
    expect(checkByEmailSpy).toHaveBeenCalledWith({
      name: userParams.name,
      email: userParams.email,
      password: "hashed_password",
    });
  });

  it("Should throw if UserRepository.create throws", async () => {
    jest
      .spyOn(userRepositoryStub, "create")
      .mockRejectedValueOnce(new Error("any_error"));
    const promise = sut.execute(userParams);
    await expect(promise).rejects.toThrow(new Error("any_error"));
  });

  it("Should return a new user if success", async () => {
    const user = await sut.execute(userParams);
    expect(user).toEqual(newUser);
  });
});
