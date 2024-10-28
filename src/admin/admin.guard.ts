import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Observable } from 'rxjs';
  import { EqualOperator } from 'typeorm';
  
  @Injectable()
  export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      if (!token) {
        throw new UnauthorizedException();
      }
      const payload = await this.jwtService.verify(token);
  
      if (!payload) {
        throw new UnauthorizedException();
      }
  
      if (!payload.isAdmin) throw new UnauthorizedException();
  
      request.payload = payload;
  
      return true;
    }
  }
  