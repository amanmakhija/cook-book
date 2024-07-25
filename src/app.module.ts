/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from './core/database/sequelize.module';
import { AuthModule } from './modules/auth/auth.module';
import { RecipeModule } from './modules/recipes/recipe.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    SequelizeModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UserModule,
    AuthModule,
    RecipeModule,
  ]
})

export class AppModule { }
