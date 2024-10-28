import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, access_token] =
      request.headers.authorization?.split(' ') ?? [];
    if (!access_token) {
      throw new UnauthorizedException();
    }
    const payload = await this.jwtService.verify(access_token, {
      secret: 'Very Secret',
    });
    
    if (!payload) {
      throw new UnauthorizedException();
    }

    request.payload = payload;
    request.token = access_token
    return true;
  }
}
