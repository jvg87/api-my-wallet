import { BcryptAdapter } from "@/infra/adapters";
import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("Bcrypt Adapter", () => {
  let sut: BcryptAdapter;
  const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
  const hashResult = "hashed-text";

  beforeAll(() => {
    mockedBcrypt.hash.mockImplementation(() => Promise.resolve(hashResult));
  });

  beforeEach(() => {
    sut = new BcryptAdapter();
  });

  describe("hash()", () => {
    it("Should call hash with correct values", async () => {
      const hashSpy = jest.spyOn(bcrypt, "hash");
      await sut.hash("any_value", 12);
      expect(hashSpy).toHaveBeenCalledWith("any_value", 12);
    });

    it("Should return a valid hash on hash success", async () => {
      const hashed = await sut.hash("any_value", 12);
      expect(hashed).toBe(hashResult);
    });
  });
});
