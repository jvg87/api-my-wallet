import { UserDetails } from "@/domain/entities";

export interface IGetUser {
  execute(userId: string): Promise<UserDetails | null>;
}
