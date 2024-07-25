/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './recipe.model';

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

  async delete(id: number): Promise<void> {
    const recipe = await this.recipeModel.findByPk(id);
    if (recipe) {
      await recipe.destroy();
    }
  }
}
