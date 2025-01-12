import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import request from "supertest";

import { UnauthorizedError } from "@/application/erros";
import app from "@/main/config/app";
import { prisma } from "@/utils";
import { hash } from "bcrypt";

describe("CreateBankAccount Route", () => {
  beforeAll(() => {});

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
    await prisma.bankAccount.deleteMany();
  });

  it("Should return 401 if authorization header is not provided", async () => {
    const { status, body } = await request(app).post("/bank-accounts");
    expect(status).toBe(401);
    expect(body).toEqual({ error: new UnauthorizedError().message });
  });

  it("Should return 200 with user details ", async () => {
    const passwordHashed = await hash("any_password", 12);

    await prisma.user.create({
      data: {
        name: "any_name",
        email: "any_mail@mail.com",
        password: passwordHashed,
      },
    });

    const response = await request(app).post("/auth").send({
      email: "any_mail@mail.com",
      password: "any_password",
    });

    const { status } = await request(app)
      .post("/bank-accounts")
      .set({
        authorization: `Bearer ${response.body.token}`,
      })
      .send({
        name: "teste",
        initialBalance: 1000,
        color: "#fff",
        type: "CASH",
      });

    expect(status).toBe(201);
  });
});
