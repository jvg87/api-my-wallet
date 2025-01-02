export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserParams = Omit<User, "id">;

export type AuthUser = {
  name: string;
  email: string;
  token: string;
};

export type AuthUserParams = {
  email: string;
  password: string;
};
