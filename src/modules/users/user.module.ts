/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/schemas/user.model';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule],
  providers: [UserService, {
    provide: 'User_Repository',
    useValue: User,
  }],
  exports: [UserService],
})
export class UserModule { }
