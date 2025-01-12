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
  const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
  const HASH_RESULT = "hashed-text";

  let sut: BcryptAdapter;

  beforeAll(() => {
    mockedBcrypt.hash.mockImplementation(() => Promise.resolve(HASH_RESULT));
    mockedBcrypt.compare.mockImplementation(() => Promise.resolve(true));
  });

  beforeEach(() => {
    sut = new BcryptAdapter();
  });

  describe("hash()", () => {
    it("Should call hash with correct values", async () => {
      await sut.hash("any_value", 12);
      expect(mockedBcrypt.hash).toHaveBeenCalledWith("any_value", 12);
    });

    it("Should return a valid hash on hash success", async () => {
      const hashed = await sut.hash("any_value", 12);
      expect(hashed).toBe(HASH_RESULT);
    });

    it("Should throw if hash throws", async () => {
      mockedBcrypt.hash.mockImplementationOnce(() => {
        throw new Error("any_error");
      });
      const promise = sut.hash("any_value", 12);
      await expect(promise).rejects.toThrow(new Error("any_error"));
    });
  });

  describe("compare()", () => {
    it("Should call compare with correct values", async () => {
      await sut.compare("any_value", HASH_RESULT);
      expect(mockedBcrypt.compare).toHaveBeenCalledWith(
        "any_value",
        HASH_RESULT
      );
    });

    it("Should return true when compare succeeds", async () => {
      const isValid = await sut.compare("any_value", HASH_RESULT);
      expect(isValid).toBeTruthy();
    });

    it("Should return false when compare fails", async () => {
      mockedBcrypt.compare.mockImplementationOnce(() => Promise.resolve(false));
      const isValid = await sut.compare("any_value", HASH_RESULT);
      expect(isValid).toBeFalsy();
    });

    it("Should throw if compare throws", async () => {
      mockedBcrypt.compare.mockImplementationOnce(() => {
        throw new Error("any_error");
      });
      const promise = sut.compare("any_value", HASH_RESULT);
      await expect(promise).rejects.toThrow(new Error("any_error"));
    });
  });
});
