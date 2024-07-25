/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Request, Get, UnauthorizedException, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../users/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtStrategy: JwtStrategy, private readonly userService: UserService) { }

  @Post('register')
  async register(
    @Body()
    body: {
      email: string;
      name: string;
      password: string;
      profilePicture?: string;
    },
  ) {
    const { email, name, password, profilePicture } = body;
    return this.authService.register(
      email,
      name,
      password,
      profilePicture,
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    const user = await this.jwtStrategy.validateToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  @Put('update')
  async updateProfile(@Request() req, @Body() body: { favouriteRecipe: string; profilePicture: string }) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    const user = await this.jwtStrategy.validateToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.userService.updateUser(user.email, body.favouriteRecipe, body.profilePicture);
  }
}
