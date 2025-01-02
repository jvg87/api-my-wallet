import { jest } from "@jest/globals";

import { IUserRepository } from "@/domain/protocols";

export const mockUserRepository: jest.Mocked<IUserRepository> = {
  checkByEmail: jest.fn(),
  create: jest.fn(),
  findByEmail: jest.fn(),
};
