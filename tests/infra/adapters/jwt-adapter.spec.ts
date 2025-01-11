import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import jwt from "jsonwebtoken";

import { JwtAdapter } from "@/infra/adapters";
import { mockAuthUser, mockUser } from "@/tests/domain/mocks";

jest.mock("jsonwebtoken");

describe("Jwt Adapter", () => {
  let sut: JwtAdapter;

  const mockJwt = jwt as jest.Mocked<typeof jwt>;

  const SECRET_KEY = "any_key";
  const EXPIRE_DATE = "any_date";

  beforeAll(() => {
    mockJwt.sign.mockImplementation(() => mockAuthUser().token);
  });

  beforeEach(() => {
    sut = new JwtAdapter(SECRET_KEY, EXPIRE_DATE);
  });

  describe("sign()", () => {
    it("Should call sign with correct values", async () => {
      const signSpy = jest.spyOn(jwt, "sign");
      await sut.encrypt(mockUser().id);
      expect(signSpy).toHaveBeenCalledWith({ sub: mockUser().id }, SECRET_KEY, {
        expiresIn: EXPIRE_DATE,
      });
    });

    it("Should return a valid token on sign success", async () => {
      const accessToken = await sut.encrypt(mockUser().id);
      expect(accessToken).toBe(mockAuthUser().token);
    });

    it("Should throw if sign throws", async () => {
      jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.encrypt(mockUser().id);
      await expect(promise).rejects.toThrow();
    });
  });

  describe("verify()", () => {
    it("Should call verify with correct values", async () => {
      const verifySpy = jest.spyOn(jwt, "verify");
      await sut.decrypt(mockAuthUser().token);
      expect(verifySpy).toHaveBeenCalledWith(mockAuthUser().token, SECRET_KEY);
    });

    it("Should return null if verify returns null", async () => {
      jest.spyOn(jwt, "verify").mockImplementationOnce(() => null);
      const payload = await sut.decrypt("invalid_token");
      expect(payload).toBeNull();
    });

    it("Should throws if verify throws", async () => {
      jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.decrypt("invalid_token");
      await expect(promise).rejects.toThrow();
    });

    it("Should return a payload on verify success", async () => {
      jest.spyOn(jwt, "verify").mockImplementationOnce(() => ({
        sub: mockUser().id,
      }));
      const payload = await sut.decrypt(mockAuthUser().token);
      expect(payload).toEqual({ sub: mockUser().id });
    });
  });
});
