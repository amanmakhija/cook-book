/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    profilePicture?: string;
}