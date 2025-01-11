import { User, UserDetails, UserParams } from "@/domain/entities";

export interface IUserRepository {
  checkByEmail(email: string): Promise<boolean>;
  create(data: UserParams): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<UserDetails | null>;
}
