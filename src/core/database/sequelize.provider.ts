/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { Recipe } from '../../schemas/recipe.model';
import { User } from '../../schemas/user.model';

// export const sequelizeConfig: SequelizeOptions = {
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   models: [User, Recipe],
//   // autoLoadModels: true,
//   // synchronize: true,
// };

export const sequelizeProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([User, Recipe]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
