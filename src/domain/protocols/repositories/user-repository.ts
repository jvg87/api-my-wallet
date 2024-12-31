import { User, UserParams } from "@/domain/entities";

export interface IUserRepository {
  checkByEmail(email: string): Promise<boolean>;
  create(data: UserParams): Promise<User | null>;
}
