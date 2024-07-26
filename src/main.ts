/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const sequelize = app.get(Sequelize);

  // await sequelize.sync({ force: false });
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
