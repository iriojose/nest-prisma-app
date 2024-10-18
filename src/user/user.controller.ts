import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserParamDto } from './dtos/user-param.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SafeUser } from '../utils';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getUsers(): Promise<SafeUser[]> {
        return await this.userService.getUsers()
    }

    @Get(':id')
    async getUser(@Param() param: UserParamDto): Promise<SafeUser> {
        return await this.userService.getUser(param.id)
    }
}
