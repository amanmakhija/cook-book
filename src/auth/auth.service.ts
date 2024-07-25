/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    email: string,
    name: string,
    password: string,
    profilePicture?: string,
  ): Promise<{ user: User; access_token: string }> {
    const userExists = await this.userService.findUser(email);
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    const user = await this.userService.register(email, name, password, profilePicture);
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return { user, access_token };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: User; access_token: string }> {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return { user, access_token };
  }
}
