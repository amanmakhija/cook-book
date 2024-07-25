/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserModule } from 'src/users/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Recipe]), UserModule],
  providers: [RecipeService, JwtStrategy, JwtService],
  controllers: [RecipeController],
})
export class RecipeModule {}
