import { afterAll, beforeEach, describe, expect, it } from "@jest/globals";
import request from "supertest";

import { UnauthorizedError } from "@/application/erros";
import app from "@/main/config/app";
import { prisma } from "@/utils";
import { hash } from "bcrypt";

describe("GetUser Route", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it("Should return 401 if authorization header is not provided", async () => {
    const { status, body } = await request(app).get("/me");
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

    const { status, body } = await request(app)
      .get("/me")
      .set({
        authorization: `Bearer ${response.body.token}`,
      });

    expect(status).toBe(200);
    expect(body).toEqual({
      email: "any_mail@mail.com",
      name: "any_name",
    });
  });
});
