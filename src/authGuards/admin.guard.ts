import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtTokenService } from './jwt.service';
import { USER_ROLE } from 'src/common/constants';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['x-access-token'];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const user = await this.jwtService.verifyToken(token);

    if (user.role_id !== USER_ROLE.ADMIN) {
      throw new ForbiddenException('Admin access only');
    }
    
    request.user = user;
    
    return true;
  }
}