import { IsString, IsNotEmpty } from "class-validator"

export class UserParamDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}