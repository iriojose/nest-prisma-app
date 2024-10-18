import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from 'src/auth/dtos/auth-login.dto';
import { AuthSignupDto } from './dtos/auth-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() data: AuthLoginDto) {
        return this.authService.login(data);
    }

    @Post('register')
    async register(@Body() data: AuthSignupDto) {
        return this.authService.signUp(data)
    }
}