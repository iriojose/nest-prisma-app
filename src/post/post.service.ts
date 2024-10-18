import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post, Prisma } from "@prisma/client"
import { PostCreateDto } from './dtos/post-create.dto';

@Injectable()
export class PostService {
    constructor(private readonly prismaClient: PrismaService){}

    async getPosts(): Promise<Post[]> {
        return await this.prismaClient.post.findMany({
            include: { author: true}
        })
    }

    async getPost(id: string): Promise<Post> {
        const post = await this.prismaClient.post.findUnique({
            where: { id },
            include: { author: true } 
        })
        
        if(!post) throw new NotFoundException("Post not found")
        return post
    }

    async createPost(data: PostCreateDto, id: string): Promise<Post> {
        return await this.prismaClient.post.create({ data: {
            ...data,
            authorId: id
        }})
    }

    async updatePost(id: string, data: Prisma.PostUpdateInput): Promise<Post> {
        return await this.prismaClient.post.update({
            where: { id },
            data,
        });
    }

    async deletePost(id: string): Promise<Post>{
        return await this.prismaClient.post.delete({
            where: { id }
        })
    }
}
