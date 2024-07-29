/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Recipe } from '../../schemas/recipe.model';

@Injectable()
export class RecipeService {
  constructor(
    @Inject('Recipe_Repository')
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

  async delete(userID: number, id: number): Promise<object> {
    const recipe = await this.recipeModel.findByPk(id);
    if (!recipe) throw new NotFoundException();
    if (userID !== parseInt(recipe.postedBy)) throw new UnauthorizedException();
    if (recipe) await recipe.destroy();
    return { message: 'Recipe deleted successfully' };
  }
}
