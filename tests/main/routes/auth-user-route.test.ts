import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import { hash } from "bcrypt";
import request from "supertest";

import { UnauthorizedError } from "@/application/erros";
import app from "@/main/config/app";
import { prisma } from "@/utils";

describe("AuthUser Route", () => {
  beforeAll(() => {});

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it("Should return 200 on auth user ", async () => {
    const passwordHashed = await hash("any_password", 12);

    await prisma.user.create({
      data: {
        name: "any_name",
        email: "any_mail@mail.com",
        password: passwordHashed,
      },
    });

    const { status, body } = await request(app).post("/auth").send({
      email: "any_mail@mail.com",
      password: "any_password",
    });

    expect(status).toBe(200);
    expect(body.token).toBeDefined();
  });

  it("Should return 401 if invalid email is provided", async () => {
    const passwordHashed = await hash("any_password", 12);

    await prisma.user.create({
      data: {
        name: "any_name",
        email: "any_mail@mail.com",
        password: passwordHashed,
      },
    });

    const { status, body } = await request(app).post("/auth").send({
      email: "invalid_email@mail.com",
      password: "any_password",
    });

    expect(status).toBe(401);
    expect(body).toEqual({ error: new UnauthorizedError().message });
  });

  it("Should return 401 if invalid password is provided", async () => {
    const passwordHashed = await hash("any_password", 12);

    await prisma.user.create({
      data: {
        name: "any_name",
        email: "any_mail@mail.com",
        password: passwordHashed,
      },
    });

    const { status, body } = await request(app).post("/auth").send({
      email: "any_mail@mail.com",
      password: "invalid_password",
    });

    expect(status).toBe(401);
    expect(body).toEqual({ error: new UnauthorizedError().message });
  });
});
