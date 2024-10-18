import { Controller, Get, Post, Put, Param, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { PostService } from './post.service';
import { PostCreateDto } from './dtos/post-create.dto';
import { PostUpdateDto } from './dtos/post-update.dto';
import { PostParamDto } from './dtos/post-param.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async getPosts(): Promise<PostModel[]> {
        return await this.postService.getPosts();
    }

    @Get(':id')
    async getPostById(@Param() param: PostParamDto): Promise<PostModel | null> {
        return await this.postService.getPost(param.id)
    }

    @Post()
    async createPost(@Body() postData: PostCreateDto, @Request() req): Promise<PostModel> {
        return await this.postService.createPost(postData, req.user.id);
    }

    @Put(':id')
    async updatePost(@Param() param: PostParamDto, @Body() postData: PostUpdateDto): Promise<PostModel> {
        return await this.postService.updatePost(param.id, postData);
    }

    @Delete(':id')
    async deletePost(@Param() param: PostParamDto): Promise<void> {
        await this.postService.deletePost(param.id);
    }
}
