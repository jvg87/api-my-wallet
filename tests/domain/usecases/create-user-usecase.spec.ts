import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { IHasher } from "@/domain/protocols";
import { CreateUserUseCase } from "@/domain/usecases";

import {
  mockUser,
  mockUserParams,
  mockUserRepository,
} from "@/tests/domain/mocks";

describe("CreateUser UseCase", () => {
  const hasherStub: jest.Mocked<IHasher> = {
    hash: jest.fn(),
  };

  let sut: CreateUserUseCase;

  beforeAll(() => {
    mockUserRepository.checkByEmail.mockResolvedValue(false);
    mockUserRepository.create.mockResolvedValue(mockUser());
    hasherStub.hash.mockResolvedValue("hashed_password");
  });

  beforeEach(() => {
    sut = new CreateUserUseCase(mockUserRepository, hasherStub);
  });

  it("Should call UserRepository.checkByEmail with correct email ", async () => {
    const checkByEmailSpy = jest.spyOn(mockUserRepository, "checkByEmail");
    await sut.execute(mockUserParams());
    expect(checkByEmailSpy).toHaveBeenCalledWith(mockUserParams().email);
  });

  it("Should return null if UserRepository.checkByEmail return true ", async () => {
    jest.spyOn(mockUserRepository, "checkByEmail").mockResolvedValueOnce(true);
    const emailExists = await sut.execute(mockUserParams());
    expect(emailExists).toBeFalsy();
  });

  it("Should throw if UserRepository.checkByEmail throws", async () => {
    jest
      .spyOn(mockUserRepository, "checkByEmail")
      .mockRejectedValueOnce(new Error());
    const promise = sut.execute(mockUserParams());
    await expect(promise).rejects.toThrow();
  });

  it("Should call hash with correct password ", async () => {
    const hashSpy = jest.spyOn(hasherStub, "hash");
    await sut.execute(mockUserParams());
    expect(hashSpy).toHaveBeenCalledWith(mockUserParams().password, 12);
  });

  it("Should throw if hash throws", async () => {
    jest.spyOn(hasherStub, "hash").mockRejectedValueOnce(new Error());
    const promise = sut.execute(mockUserParams());
    await expect(promise).rejects.toThrow();
  });

  it("Should call UserRepository.create with correct values ", async () => {
    const checkByEmailSpy = jest.spyOn(mockUserRepository, "create");
    await sut.execute(mockUserParams());
    expect(checkByEmailSpy).toHaveBeenCalledWith({
      name: mockUserParams().name,
      email: mockUserParams().email,
      password: "hashed_password",
    });
  });

  it("Should throw if UserRepository.create throws", async () => {
    jest
      .spyOn(mockUserRepository, "create")
      .mockRejectedValueOnce(new Error("any_error"));
    const promise = sut.execute(mockUserParams());
    await expect(promise).rejects.toThrow(new Error("any_error"));
  });

  it("Should return a new user if success", async () => {
    const user = await sut.execute(mockUserParams());
    expect(user).toEqual(mockUser());
  });
});
