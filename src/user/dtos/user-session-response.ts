import { User } from "@prisma/client"

export class UserSessionResponseDto {
    token: string
    user: User
}