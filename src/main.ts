/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sequelize = app.get(Sequelize);

  await sequelize.sync({ force: false });
  await app.listen(3000);
}
bootstrap();
