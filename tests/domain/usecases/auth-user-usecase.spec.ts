import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { IEncrypter, IHashComparer } from "@/domain/protocols";
import { AuthUserUseCase } from "@/domain/usecases";
import {
  mockAuthUser,
  mockAuthUserParams,
  mockUser,
  mockUserRepository,
} from "@/tests/domain/mocks";

describe("AuthUser UseCase", () => {
  const mockHashComparer: jest.Mocked<IHashComparer> = {
    compare: jest.fn(),
  };

  const mockEncrypter: jest.Mocked<IEncrypter> = {
    encrypt: jest.fn(),
  };

  let sut: AuthUserUseCase;

  beforeAll(() => {
    mockUserRepository.findByEmail.mockResolvedValue(mockUser());
    mockHashComparer.compare.mockResolvedValue(true);
    mockEncrypter.encrypt.mockResolvedValue(mockAuthUser().token);
  });

  beforeEach(() => {
    sut = new AuthUserUseCase(
      mockUserRepository,
      mockHashComparer,
      mockEncrypter
    );
  });

  it("Should call UserRepository.findByEmail with correct email ", async () => {
    await sut.execute(mockAuthUserParams());
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      mockAuthUserParams().email
    );
  });

  it("Should return null if UserRepository.findByEmail return null", async () => {
    mockUserRepository.findByEmail.mockResolvedValueOnce(null);
    const user = await sut.execute(mockAuthUserParams());
    expect(user).toBeNull();
  });

  it("Should throws if UserRepository.findByEmail throws ", async () => {
    mockUserRepository.findByEmail.mockRejectedValueOnce(new Error());
    const promise = sut.execute(mockAuthUserParams());
    await expect(promise).rejects.toThrow();
  });

  it("Should call HashComparer with correct values", async () => {
    await sut.execute(mockAuthUserParams());
    expect(mockHashComparer.compare).toHaveBeenCalledWith(
      mockAuthUserParams().password,
      mockUser().password
    );
  });

  it("Should throws if HashComparer throws", async () => {
    mockHashComparer.compare.mockRejectedValueOnce(new Error());
    const promise = sut.execute(mockAuthUserParams());
    await expect(promise).rejects.toThrow();
  });

  it("Should return null if HashComparer returns false", async () => {
    mockHashComparer.compare.mockResolvedValueOnce(false);
    const user = await sut.execute(mockAuthUserParams());
    expect(user).toBeNull();
  });

  it("Should call Encrypter with correct id", async () => {
    await sut.execute(mockAuthUserParams());
    expect(mockEncrypter.encrypt).toHaveBeenCalledWith(mockUser().id);
  });

  it("Should throw if Encrypter throws", async () => {
    mockEncrypter.encrypt.mockRejectedValueOnce(new Error());
    const promise = sut.execute(mockAuthUserParams());
    await expect(promise).rejects.toThrow();
  });

  it("Should return AuthUser on success", async () => {
    const authUser = await sut.execute(mockAuthUserParams());
    expect(authUser).toEqual(mockAuthUser());
  });
});
