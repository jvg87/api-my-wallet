import { BankAccountType } from "@/domain/entities";
import { PrismaBankAccountRepository } from "@/infra/repositories";
import { prisma } from "@/utils";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";

describe("PrismaBankAccount Repository", () => {
  let sut: PrismaBankAccountRepository;

  beforeAll(() => {});

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    sut = new PrismaBankAccountRepository();
    await prisma.user.deleteMany();
    await prisma.bankAccount.deleteMany();
  });

  describe("create()", () => {
    it("Should return a bank account on success", async () => {
      const user = await prisma.user.create({
        data: {
          email: "any_email@mail.com",
          name: "any_name",
          password: "any_password",
        },
      });

      const bankAccount = await sut.create({
        name: "any_name",
        color: "any_color",
        initialBalance: 0,
        type: BankAccountType.CASH,
        userId: user.id,
      });

      expect(bankAccount).toBeTruthy();
      expect(bankAccount?.id).toBeTruthy();
    });
  });

  describe("findAllByUserId()", () => {
    it("Should return a list of bank accounts on success", async () => {
      const user = await prisma.user.create({
        data: {
          email: "any_email@mail.com",
          name: "any_name",
          password: "any_password",
        },
      });

      await sut.create({
        name: "account_1",
        color: "any_color",
        initialBalance: 0,
        type: BankAccountType.CASH,
        userId: user.id,
      });

      await sut.create({
        name: "account_2",
        color: "any_color",
        initialBalance: 0,
        type: BankAccountType.CHECKING,
        userId: user.id,
      });

      const listAccount = await sut.findAllByUserId(user.id);

      expect(listAccount).toBeTruthy();
      expect(listAccount).toBeInstanceOf(Array);
    });
  });
});