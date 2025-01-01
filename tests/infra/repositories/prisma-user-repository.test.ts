import { PrismaUserRepository } from "@/infra/repositories";
import { prisma } from "@/utils";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";

describe("PrismaUser Repository", () => {
  let sut: PrismaUserRepository;

  beforeAll(() => {});

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    sut = new PrismaUserRepository();
    await prisma.user.deleteMany();
  });

  describe("checkByEmail()", () => {
    it("Should return true if email exists", async () => {
      await prisma.user.create({
        data: {
          email: "any_email@mail.com",
          name: "any_name",
          password: "any_password",
        },
      });

      const isExists = await sut.checkByEmail("any_email@mail.com");
      expect(isExists).toBeTruthy();
    });

    it("Should return false if email not exists", async () => {
      const isExists = await sut.checkByEmail("any_email@mail.com");
      expect(isExists).toBeFalsy();
    });
  });

  describe("create()", () => {
    it("Should return a new user on success", async () => {
      const user = await sut.create({
        email: "any_email@mail.com",
        name: "any_name",
        password: "any_password",
      });

      expect(user).toBeTruthy();
      expect(user?.id).toBeTruthy();
      expect(user?.name).toBe("any_name");
    });
  });
});
