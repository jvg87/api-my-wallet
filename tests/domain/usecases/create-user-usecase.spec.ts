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
  const mockHasher: jest.Mocked<IHasher> = {
    hash: jest.fn(),
  };

  let sut: CreateUserUseCase;

  beforeAll(() => {
    mockUserRepository.checkByEmail.mockResolvedValue(false);
    mockUserRepository.create.mockResolvedValue(mockUser());
    mockHasher.hash.mockResolvedValue("hashed_password");
  });

  beforeEach(() => {
    sut = new CreateUserUseCase(mockUserRepository, mockHasher);
  });

  it("Should call UserRepository.checkByEmail with correct email ", async () => {
    await sut.execute(mockUserParams());
    expect(mockUserRepository.checkByEmail).toHaveBeenCalledWith(
      mockUserParams().email
    );
  });

  it("Should return null if UserRepository.checkByEmail return true ", async () => {
    mockUserRepository.checkByEmail.mockResolvedValueOnce(true);
    const emailExists = await sut.execute(mockUserParams());
    expect(emailExists).toBeFalsy();
  });

  it("Should throw if UserRepository.checkByEmail throws", async () => {
    mockUserRepository.checkByEmail.mockRejectedValueOnce(new Error());
    const promise = sut.execute(mockUserParams());
    await expect(promise).rejects.toThrow();
  });

  it("Should call hash with correct password ", async () => {
    await sut.execute(mockUserParams());
    expect(mockHasher.hash).toHaveBeenCalledWith(mockUserParams().password, 12);
  });

  it("Should throw if hash throws", async () => {
    mockHasher.hash.mockRejectedValueOnce(new Error());
    const promise = sut.execute(mockUserParams());
    await expect(promise).rejects.toThrow();
  });

  it("Should call UserRepository.create with correct values ", async () => {
    await sut.execute(mockUserParams());
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      name: mockUserParams().name,
      email: mockUserParams().email,
      password: "hashed_password",
    });
  });

  it("Should throw if UserRepository.create throws", async () => {
    mockUserRepository.create.mockRejectedValueOnce(new Error("any_error"));
    const promise = sut.execute(mockUserParams());
    await expect(promise).rejects.toThrow(new Error("any_error"));
  });

  it("Should return a new user if success", async () => {
    const user = await sut.execute(mockUserParams());
    expect(user).toEqual(mockUser());
  });
});
