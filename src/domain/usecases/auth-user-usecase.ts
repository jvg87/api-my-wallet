import { AuthUser, AuthUserParams } from "@/domain/entities";
import { IAuthUser, IUserRepository } from "@/domain/protocols";

export class AuthUserUseCase implements IAuthUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(authParams: AuthUserParams): Promise<AuthUser | null> {
    await this.userRepository.findByEmail(authParams.email);

    return {
      email: "",
      name: "",
      token: "",
    };
  }
}
