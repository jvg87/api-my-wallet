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
});
