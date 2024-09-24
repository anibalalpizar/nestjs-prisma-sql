import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGroupPostDto, CreatePostDto } from '../dtos/Post.dto';
import { PostService } from './posts.services';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() { userId, ...createPostData }: CreatePostDto) {
    return this.postService.createPost(userId, createPostData);
  }

  @Post('group')
  @UsePipes(ValidationPipe)
  createGroupPost(
    @Body() { userIds, ...createGroupPostData }: CreateGroupPostDto,
  ) {
    return this.postService.createGroupPost(userIds, createGroupPostData);
  }

  @Get('group')
  getGroupPosts() {
    return this.postService.getGroupPosts();
  }
}
