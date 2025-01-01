export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserParams = Omit<User, "id">;
