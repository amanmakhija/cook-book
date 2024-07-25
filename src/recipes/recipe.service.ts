/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './recipe.model';
import { User } from 'src/users/user.model';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe)
    private readonly recipeModel: typeof Recipe,
  ) { }

  create(recipe: Partial<Recipe>): Promise<Recipe> {
    return this.recipeModel.create(recipe);
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeModel.findAll();
  }

  findById(id: number): Promise<Recipe> {
    return this.recipeModel.findByPk(id);
  }

  findByName(name: string): Promise<Recipe[]> {
    return this.recipeModel.findAll({ where: { name } });
  }

  async delete(user: User, id: number): Promise<object> {
    const recipe = await this.recipeModel.findByPk(id);
    if (!recipe) {
      throw new NotFoundException();
    }
    if (parseInt(recipe.postedBy) !== user.id) {
      throw new UnauthorizedException();
    }
    if (recipe) {
      await recipe.destroy();
    }
    return { message: 'Recipe deleted successfully' };
  }
}
