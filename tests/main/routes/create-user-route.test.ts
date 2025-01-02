import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import request from "supertest";

import { EmailAlreadyExistsError } from "@/application/erros";
import app from "@/main/config/app";
import { prisma } from "@/utils";

describe("CreateUser Controller", () => {
  beforeAll(() => {});

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it("Should return 201 on created user", async () => {
    const { status, body } = await request(app).post("/users").send({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });

    expect(status).toBe(201);
  });

  it("Should return 409 if email already exists", async () => {
    await prisma.user.create({
      data: {
        name: "Teste",
        email: "teste@teste.com",
        password: "123123",
      },
    });

    const { body, status } = await request(app).post("/users").send({
      name: "Teste",
      email: "teste@teste.com",
      password: "123123",
    });
    expect(status).toBe(409);
    expect(body).toEqual({ error: new EmailAlreadyExistsError().message });
  });
});
