/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    favouriteRecipe?: string;

    @IsString()
    profilePicture?: string;
}