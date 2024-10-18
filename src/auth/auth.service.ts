import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User as UserModel } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; 
import { AuthSignupDto } from 'src/auth/dtos/auth-signup.dto';
import { AuthLoginDto } from 'src/auth/dtos/auth-login.dto';
import { JwtPayload } from './dtos/jwt-payload';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string): Promise<UserModel | null> {
        const user = await this.userService.getUserByEmail(email);
        if (user) {
            return user;
        }
        return null;
    }

    async login(data: AuthLoginDto): Promise<{token: string}> {
        const user = await this.userService.getUserByEmail(data.email);
        if(!user) throw new NotFoundException('No such user found');

        const valid = await bcrypt.compare(data.password, user.password)
        if (!valid) throw new BadRequestException('Invalid password');
        const payload: JwtPayload = { email: user.email, sub: user.id };

        return {
            token: this.jwtService.sign(payload),
        };
    }

    async signUp(data: AuthSignupDto): Promise<{token: string}> {
        const existingUser = await this.userService.getUserByEmail(data.email);
        if(existingUser) throw new ConflictException('User already exists');
        
        const user = await this.userService.createUser({ ...data });
        const payload: JwtPayload = { email: user.email, sub: user.id };
        
        return {
            token: this.jwtService.sign(payload),
        }
    }
}
