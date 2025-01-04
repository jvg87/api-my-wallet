import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { IHashComparer } from "@/domain/protocols";
import { AuthUserUseCase } from "@/domain/usecases";
import {
  mockAuthUserParams,
  mockUser,
  mockUserRepository,
} from "@/tests/domain/mocks";

describe("AuthUser UseCase", () => {
  const mockHashComparer: jest.Mocked<IHashComparer> = {
    compare: jest.fn(),
  };
  let sut: AuthUserUseCase;

  beforeAll(() => {
    mockUserRepository.findByEmail.mockResolvedValue(mockUser());
    mockHashComparer.compare.mockResolvedValue(true);
  });

  beforeEach(() => {
    sut = new AuthUserUseCase(mockUserRepository, mockHashComparer);
  });

  it("Should call UserRepository.findByEmail with correct email ", async () => {
    const findByEmailSpy = jest.spyOn(mockUserRepository, "findByEmail");
    await sut.execute(mockAuthUserParams());
    expect(findByEmailSpy).toHaveBeenCalledWith(mockAuthUserParams().email);
  });

  it("Should return null if UserRepository.findByEmail return null", async () => {
    jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValueOnce(null);
    const user = await sut.execute(mockAuthUserParams());
    expect(user).toBeNull();
  });

  it("Should throws if UserRepository.findByEmail throws ", async () => {
    jest
      .spyOn(mockUserRepository, "findByEmail")
      .mockRejectedValueOnce(new Error());
    const promise = sut.execute(mockAuthUserParams());
    await expect(promise).rejects.toThrow();
  });

  it("Should call HashComparer with correct values", async () => {
    const compareSpy = jest.spyOn(mockHashComparer, "compare");
    await sut.execute(mockAuthUserParams());
    expect(compareSpy).toHaveBeenCalledWith(
      mockAuthUserParams().password,
      mockUser().password
    );
  });

  it("Should throws if HashComparer throws", async () => {
    jest.spyOn(mockHashComparer, "compare").mockRejectedValueOnce(new Error());
    const promise = sut.execute(mockAuthUserParams());
    await expect(promise).rejects.toThrow();
  });
});
