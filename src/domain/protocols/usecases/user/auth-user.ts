import { AuthUser, AuthUserParams } from "@/domain/entities";

export interface IAuthUser {
  execute(authParams: AuthUserParams): Promise<AuthUser | null>;
}
