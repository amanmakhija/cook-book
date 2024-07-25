/* eslint-disable prettier/prettier */
import { User } from "src/schemas/user.model";

export class UserDto {
    user: User;
    token: string;
}