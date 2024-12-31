import { User, UserParams } from "@/domain/entities";
import { ICreateUser, IUserRepository } from "@/domain/protocols";

export class CreateUserUseCase implements ICreateUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(userParams: UserParams): Promise<User> {
    const { email, password } = userParams;
    await this.userRepository.checkByEmail(email);

    return {
      id: "string",
      name: "string",
      email: "string",
      password: "string",
    };
  }
}
