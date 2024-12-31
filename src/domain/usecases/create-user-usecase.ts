import { User, UserParams } from "@/domain/entities";
import { ICreateUser, IUserRepository } from "@/domain/protocols";

export class CreateUserUseCase implements ICreateUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(userParams: UserParams): Promise<User | null> {
    const { email, password } = userParams;
    const emailExists = await this.userRepository.checkByEmail(email);

    if (emailExists) return null;

    return {
      id: "string",
      name: "string",
      email: "string",
      password: "string",
    };
  }
}
