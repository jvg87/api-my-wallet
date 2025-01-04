import { AuthUser, AuthUserParams } from "@/domain/entities";
import {
  IAuthUser,
  IEncrypter,
  IHashComparer,
  IUserRepository,
} from "@/domain/protocols";

export class AuthUserUseCase implements IAuthUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter
  ) {}
  async execute(authParams: AuthUserParams): Promise<AuthUser | null> {
    const user = await this.userRepository.findByEmail(authParams.email);

    if (!user) return null;

    const isValid = await this.hashComparer.compare(
      authParams.password,
      user.password
    );

    if (!isValid) return null;

    const accessToken = await this.encrypter.encrypt(user.id);

    return {
      email: user.email,
      name: user.name,
      token: accessToken,
    };
  }
}
