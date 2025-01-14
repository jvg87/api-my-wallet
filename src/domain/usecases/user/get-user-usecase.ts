import { UserDetails } from "@/domain/entities";
import { IGetUser, IUserRepository } from "@/domain/protocols";

export class GetUserUseCase implements IGetUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(userId: string): Promise<UserDetails | null> {
    const user = await this.userRepository.getById(userId);

    if (!user) return null;

    return user;
  }
}
