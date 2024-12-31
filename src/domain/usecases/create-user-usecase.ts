import { User, UserParams } from "@/domain/entities";
import { ICreateUser, IHasher, IUserRepository } from "@/domain/protocols";

export class CreateUserUseCase implements ICreateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasher: IHasher
  ) {}
  async execute(userParams: UserParams): Promise<User | null> {
    const { email, password } = userParams;

    const emailExists = await this.userRepository.checkByEmail(email);

    if (emailExists) return null;

    const salt = 12;
    await this.hasher.hash(password, salt);

    return {
      id: "string",
      name: "string",
      email: "string",
      password: "string",
    };
  }
}
