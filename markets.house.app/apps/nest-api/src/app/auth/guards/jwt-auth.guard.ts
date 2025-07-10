import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  override handleRequest(err: Error | null, user: any, info: any) {
    console.log('JwtAuthGuard - user:', user, 'info:', info, 'err:', err);
    if (err || !user) {
      throw err || new UnauthorizedException('Вы не авторизованы');
    }
    return user;
  }
} 