import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthSignupDto } from '../auth/dtos/auth-signup.dto';
import * as bcrypt from 'bcrypt';
import { SafeUser } from '../utils';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prismaClient: PrismaService){}

    async getUsers(): Promise<SafeUser[]> {
        return await this.prismaClient.user.findMany({
            include: { posts: true },
            omit: { password: true}
        })
    }

    async getUser(id: string): Promise<SafeUser> {
        const user = await this.prismaClient.user.findUnique({
            where: { id },  
            omit: { password: true}
        })

        if(!user) new NotFoundException("User not Found")
        return user
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.prismaClient.user.findFirst({
            where: { email },
        })
    }

    async createUser(data: AuthSignupDto): Promise<SafeUser> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return await this.prismaClient.user.create(
            { 
                data: {
                    password: hashedPassword,
                    ...data
                },
                omit: { password: true }
            }
        )
    }
}
