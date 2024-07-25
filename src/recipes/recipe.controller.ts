/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Delete, Param, Body, Query, Request, UnauthorizedException } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService, private readonly jwtStrategy: JwtStrategy) { }

  @Post()
  async create(@Request() req, @Body() body: Partial<Recipe>) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    const user = await this.jwtStrategy.validateToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    body.postedBy = user.id.toString();
    return this.recipeService.create(body);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get('name')
  async findByName(@Request() req, @Query('name') name: string) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    const user = await this.jwtStrategy.validateToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.recipeService.findByName(name);
  }

  @Get(':id')
  async findById(@Request() req, @Param('id') id: number) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    const user = await this.jwtStrategy.validateToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.recipeService.findById(id);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: number) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    const user = await this.jwtStrategy.validateToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.recipeService.delete(user, id);
  }
}
