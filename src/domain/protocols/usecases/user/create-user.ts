import { User, UserParams } from "@/domain/entities";

export interface ICreateUser {
  execute(userParams: UserParams): Promise<User | null>;
}
