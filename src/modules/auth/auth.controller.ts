/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Request, Get, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../users/user.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { UpdateUserDto } from './dto/update.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtStrategy: JwtStrategy, private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return req.user;
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(req.user.email, updateUserDto);
  }
}
