import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { AuthUserUseCase } from "@/domain/usecases";

import {
  mockAuthUserParams,
  mockUser,
  mockUserRepository,
} from "@/tests/domain/mocks";

describe("AuthUser UseCase", () => {
  let sut: AuthUserUseCase;

  beforeAll(() => {
    mockUserRepository.findByEmail.mockResolvedValue(mockUser());
  });

  beforeEach(() => {
    sut = new AuthUserUseCase(mockUserRepository);
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
});
