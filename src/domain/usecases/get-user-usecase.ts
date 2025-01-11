import { UserDetails } from "@/domain/entities";
import { IGetUser, IUserRepository } from "@/domain/protocols";

export class GetUserUseCase implements IGetUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(userId: string): Promise<UserDetails | null> {
    await this.userRepository.getById(userId);
    return {
      email: "",
      name: "",
    };
  }
}
