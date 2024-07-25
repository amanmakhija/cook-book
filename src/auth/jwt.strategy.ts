/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'iamsecretkey',
        });
    }

    async validateToken(token: string): Promise<User> {
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: 'iamsecretkey'
                }
            );
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            const user = await this.userService.findUser(payload.email);
            return user;
        } catch {
            throw new UnauthorizedException();
        }
    }
}
