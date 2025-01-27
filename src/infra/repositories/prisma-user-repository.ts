import { User, UserDetails, UserParams } from "@/domain/entities";
import { IUserRepository } from "@/domain/protocols";
import { prisma } from "@/utils";

export class PrismaUserRepository implements IUserRepository {
  async checkByEmail(email: string): Promise<boolean> {
    const isExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isExists) return true;

    return false;
  }

  async create(data: UserParams): Promise<User | null> {
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async getById(id: string): Promise<UserDetails | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
      },
    });
    return user;
  }
}
