import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.services';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  getUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);

    if (data.username) {
      const findUserByUsername = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });
      if (findUserByUsername)
        throw new HttpException('Username already exists', 409);
    }

    return this.prisma.user.update({ where: { id }, data });
  }
}
