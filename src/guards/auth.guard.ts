/* eslint-disable prettier/prettier */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IncomingHttpHeaders } from 'http';
import { JwtStrategy } from 'src/modules/auth/jwt.strategy';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector, private jwtStrategy: JwtStrategy, private jwtService: JwtService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        return this.jwtStrategy.validate(token, request);
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = (request.headers as unknown as IncomingHttpHeaders).authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
