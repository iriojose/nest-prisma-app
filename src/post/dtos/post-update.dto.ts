import { IsString, IsNotEmpty } from "class-validator"

export class PostUpdateDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string
}