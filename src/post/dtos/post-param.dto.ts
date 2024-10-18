import { IsString, IsNotEmpty } from "class-validator"

export class PostParamDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}