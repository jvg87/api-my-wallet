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
    mockedBcrypt.compare.mockImplementation(() => Promise.resolve(true));
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

    it("Should throw if hash throws", async () => {
      jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
        throw new Error("any_error");
      });
      const promise = sut.hash("any_value", 12);
      await expect(promise).rejects.toThrow(new Error("any_error"));
    });
  });

  describe("compare()", () => {
    it("Should call compare with correct values", async () => {
      const compareSpt = jest.spyOn(mockedBcrypt, "compare");
      await sut.compare("any_value", hashResult);
      expect(compareSpt).toHaveBeenCalledWith("any_value", hashResult);
    });
  });
});
