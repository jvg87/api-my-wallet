import { GetUserUseCase } from "@/domain/usecases";
import { beforeAll, beforeEach, describe, expect, it } from "@jest/globals";

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
    await sut.execute(mockUser().id);
    expect(mockUserRepository.getById).toHaveBeenCalledWith(mockUser().id);
  });

  it("Should return null if UserRepository.getById return null", async () => {
    mockUserRepository.getById.mockResolvedValueOnce(null);
    const user = await sut.execute(mockUser().id);
    expect(user).toBeNull();
  });

  it("Should throws if UserRepository.getById throws ", async () => {
    mockUserRepository.getById.mockRejectedValueOnce(new Error());
    const promise = sut.execute(mockUser().id);
    await expect(promise).rejects.toThrow();
  });

  it("Should return a user on success", async () => {
    const user = await sut.execute(mockUser().id);
    expect(user).toEqual(mockDetailUser());
  });
});
