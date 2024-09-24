import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.services';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  createPost(userId: number, data: Prisma.PostCreateWithoutUserInput) {
    return this.prisma.post.create({
      data: { ...data, userId },
    });
  }

  createGroupPost(usersIds: number[], data: any) {
    return this.prisma.groupPost.create({
      data: {
        ...data,
        users: {
          create: usersIds.map((id) => ({ user: { connect: { id } } })),
        },
      },
    });
  }

  getGroupPosts() {
    return this.prisma.groupPost.findMany({
      include: { users: { select: { user: true } } },
    });
  }
}
