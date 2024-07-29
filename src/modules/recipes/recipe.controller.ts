/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtStrategy } from 'src/modules/auth/jwt.strategy';
import { Recipe } from '../../schemas/recipe.model';
import { RecipeService } from './recipe.service';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService, private readonly jwtStrategy: JwtStrategy) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() recipe: Partial<Recipe>) {
    recipe.postedBy = req.user.id.toString();
    return this.recipeService.create(recipe);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get('name')
  async findByName(@Query('name') name: string) {
    return this.recipeService.findByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Request() req, @Param('id') id: number) {
    if (!req.user) throw new UnauthorizedException();
    return this.recipeService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param('id') id: number) {
    if (!req.user) throw new UnauthorizedException();
    return this.recipeService.delete(req.user.id, id);
  }
}
