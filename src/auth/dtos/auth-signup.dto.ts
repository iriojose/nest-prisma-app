import { IsString, IsNotEmpty, MinLength } from "class-validator"

export class AuthSignupDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string
    
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string
}