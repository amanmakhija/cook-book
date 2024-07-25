/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../schemas/user.model';
import { LoginUserDto } from '../auth/dto/login.dto';
import { RegisterUserDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from '../auth/dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('User_Repository')
    private readonly userModel: typeof User,
  ) { }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    registerUserDto.password = hashedPassword;
    return this.userModel.create(registerUserDto);
  }

  async findUser(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<User | null> {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) return user;
    return null;
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async updateUser(email: string, updateUserDtop: UpdateUserDto): Promise<User> {
    const user = await this.findUser(email);
    // eslint-disable-next-line prefer-const
    let { favouriteRecipe, profilePicture } = updateUserDtop;
    if (favouriteRecipe) {
      favouriteRecipe += ",";
      const favouriteRecipeExists = user.favouriteRecipes.includes(favouriteRecipe);
      if (favouriteRecipeExists) user.favouriteRecipes = user.favouriteRecipes.replace(favouriteRecipe, "");
      else user.favouriteRecipes += favouriteRecipe;
      console.log(user.favouriteRecipes);
    }
    if (profilePicture) user.profilePicture = profilePicture;
    user.updatedAt = new Date();
    return user.save();
  }
}
