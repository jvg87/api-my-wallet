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

  beforeAll(() => {
    mockJwt.sign.mockImplementation(() => mockAuthUser().token);
  });

  beforeEach(() => {
    sut = new JwtAdapter("secretKey", "expiresDate");
  });

  describe("sign()", () => {
    it("Should call sign with correct values", async () => {
      const signSpy = jest.spyOn(jwt, "sign");
      await sut.encrypt(mockUser().id);
      expect(signSpy).toHaveBeenCalledWith(
        { sub: mockUser().id },
        "secretKey",
        { expiresIn: "expiresDate" }
      );
    });
  });
});
