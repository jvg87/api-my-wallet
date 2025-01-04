import { AuthUser, AuthUserParams } from "@/domain/entities";
import { IAuthUser, IHashComparer, IUserRepository } from "@/domain/protocols";

export class AuthUserUseCase implements IAuthUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashComparer: IHashComparer
  ) {}
  async execute(authParams: AuthUserParams): Promise<AuthUser | null> {
    const user = await this.userRepository.findByEmail(authParams.email);

    if (!user) return null;

    const isValid = await this.hashComparer.compare(
      authParams.password,
      user.password
    );

    if (!isValid) return null;

    return {
      email: "",
      name: "",
      token: "",
    };
  }
}
