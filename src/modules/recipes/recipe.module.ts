/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtStrategy } from 'src/modules/auth/jwt.strategy';
import { UserModule } from 'src/modules/users/user.module';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { Recipe } from 'src/schemas/recipe.model';

@Module({
  imports: [SequelizeModule, UserModule],
  providers: [RecipeService, JwtStrategy, JwtService, {
    provide: 'Recipe_Repository',
    useValue: Recipe,
  }],
  controllers: [RecipeController],
})
export class RecipeModule { }
