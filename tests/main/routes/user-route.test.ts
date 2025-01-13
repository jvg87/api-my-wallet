import { afterAll, beforeEach, describe, expect, it } from "@jest/globals";
import request from "supertest";

import {
  EmailAlreadyExistsError,
  UnauthorizedError,
} from "@/application/erros";
import app from "@/main/config/app";
import { prisma } from "@/utils";
import { hash } from "bcrypt";

describe("User Route", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  describe("POST /users", () => {
    it("Should return 201 on created user", async () => {
      const { status } = await request(app).post("/users").send({
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

  describe("POST /auth", () => {
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

  describe("GET /me", () => {
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
});
