/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Delete, Param, Body, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }

  @Post()
  create(@Body() body: Partial<Recipe>) {
    return this.recipeService.create(body);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get('name')
  findByName(@Query('name') name: string) {
    return this.recipeService.findByName(name);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.recipeService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.recipeService.delete(id);
  }
}
