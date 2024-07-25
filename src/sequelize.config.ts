/* eslint-disable prettier/prettier */
import { SequelizeOptions } from 'sequelize-typescript';
import { User } from './users/user.model';
import { Recipe } from './recipes/recipe.model';

export const sequelizeConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'cookbook',
  models: [User, Recipe],
};
