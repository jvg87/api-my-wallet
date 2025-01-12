import { jest } from "@jest/globals";

import { IBankAccountRepository } from "@/domain/protocols";

export const mockBankAccountRepository: jest.Mocked<IBankAccountRepository> = {
  create: jest.fn(),
};
