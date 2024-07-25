/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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
}
