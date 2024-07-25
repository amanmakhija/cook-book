/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../users/user.module'; // Import UserModule

@Module({
  imports: [
    JwtModule.register({
      secret: 'iamsecretkey', // Replace with your secret key
      signOptions: { expiresIn: '30d' }, // Token expiration time
    }),
    UserModule, // Import UserModule to resolve UserService dependency
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
