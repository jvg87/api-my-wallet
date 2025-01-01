import { User, UserParams } from "@/domain/entities";
import { ICreateUser, IHasher, IUserRepository } from "@/domain/protocols";

export class CreateUserUseCase implements ICreateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasher: IHasher
  ) {}
  async execute(userParams: UserParams): Promise<User | null> {
    const { email, password, name } = userParams;

    const emailExists = await this.userRepository.checkByEmail(email);

    if (emailExists === true) return null;

    const salt = 12;

    const hashedPassword = await this.hasher.hash(password, salt);

    const newUser = await this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    return newUser;
  }
}
