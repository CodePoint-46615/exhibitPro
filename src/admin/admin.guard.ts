import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { jwtConstants } from "src/users/user.constant";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException('No token provided', 401);
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      request['user'] = payload;
      // Only allow access if user is host
      if (!payload.role || payload.role !== 'admin') {
        throw new HttpException('Unauthorized', 403);
      }
    } catch {
      throw new HttpException('Invalid token', 401);
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}