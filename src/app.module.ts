/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.model';
import { Recipe } from './recipes/recipe.model';
import { RecipeModule } from './recipes/recipe.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'cookbook',
      models: [User, Recipe],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    RecipeModule,
  ],
})
export class AppModule { }
