import { IsString, IsNotEmpty, MinLength } from "class-validator"

export class AuthLoginDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string
}