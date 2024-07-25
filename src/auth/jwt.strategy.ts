/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'iamsecretkey', // Must match the secret used in JwtModule
        });
    }

    async validate(payload: any): Promise<User> {
        return this.userService.findOneById(payload.sub); // Implement findOneById in your UserService
    }
}
