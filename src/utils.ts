
import { User } from "@prisma/client"

export type SafeUser = Omit<User, 'password'>

export type ValidateUser = {
    id: string
    email: string
    password: string
}