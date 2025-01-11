import { GetUserUseCase } from "@/domain/usecases";
import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import {
  mockDetailUser,
  mockUser,
  mockUserRepository,
} from "@/tests/domain/mocks";

describe("GetUser UseCase", () => {
  let sut: GetUserUseCase;

  beforeAll(() => {
    mockUserRepository.getById.mockResolvedValue(mockDetailUser());
  });

  beforeEach(() => {
    sut = new GetUserUseCase(mockUserRepository);
  });

  it("Should call UserRepository.getById with correct id", async () => {
    const getByIdSpy = jest.spyOn(mockUserRepository, "getById");
    await sut.execute(mockUser().id);
    expect(getByIdSpy).toHaveBeenCalledWith(mockUser().id);
  });

  it("Should return null if UserRepository.findByEmail return null", async () => {
    jest.spyOn(mockUserRepository, "getById").mockResolvedValueOnce(null);
    const user = await sut.execute(mockUser().id);
    expect(user).toBeNull();
  });
});
