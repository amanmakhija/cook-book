/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) { }

  async register(
    email: string,
    name: string,
    password: string,
    profilePicture: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({
      email,
      name,
      profilePicture,
      password: hashedPassword,
    });
  }

  async findUser(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) return user;
    return null;
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async updateUser(email: string, favouriteRecipe: string, profilePicture: string): Promise<User> {
    const user = await this.findUser(email);
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
