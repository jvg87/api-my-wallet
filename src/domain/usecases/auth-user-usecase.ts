import { AuthUser, AuthUserParams } from "@/domain/entities";
import { IAuthUser, IUserRepository } from "@/domain/protocols";

export class AuthUserUseCase implements IAuthUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(authParams: AuthUserParams): Promise<AuthUser | null> {
    const user = await this.userRepository.findByEmail(authParams.email);

    if (!user) return null;

    return {
      email: "",
      name: "",
      token: "",
    };
  }
}
