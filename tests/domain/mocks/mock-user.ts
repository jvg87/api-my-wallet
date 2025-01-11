import {
  AuthUser,
  AuthUserParams,
  User,
  UserDetails,
  UserParams,
} from "@/domain/entities";

export const mockUser = (): User => ({
  id: "user_id",
  email: "user_email@mail.com",
  name: "user_name",
  password: "user_password",
});

export const mockUserParams = (): UserParams => ({
  email: "any_email@mail.com",
  name: "any_name",
  password: "any_password",
});

export const mockAuthUserParams = (): AuthUserParams => ({
  email: "user_email@mail.com",
  password: "user_password",
});

export const mockAuthUser = (): AuthUser => ({
  email: "user_email@mail.com",
  name: "user_name",
  token: "user_token",
});

export const mockDetailUser = (): UserDetails => ({
  email: "user_email@mail.com",
  name: "user_name",
});
