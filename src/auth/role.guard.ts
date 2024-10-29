import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
export const  Roles = (...roles: string[]) => SetMetadata('roles', roles)

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        try{
            if(!user || !user.role) {
                throw new UnauthorizedException('user is not authenticate')
            } if(user.role !== 'admin') {
                throw new UnauthorizedException('you are is not admin')
            }
            return true
        } catch(error) {
            throw new UnauthorizedException(error.message)
        }
    }
}