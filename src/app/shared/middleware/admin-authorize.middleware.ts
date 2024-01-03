import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export function AdminAuthorizeMiddleware(...roles: (number)[]): any {

  @Injectable()
  class AdminAuthorizeMiddlewareCtor implements NestMiddleware {

    constructor(
      private readonly jwtService: JwtService
    ) { }

    async use(req: any, res: any, next: (error?: any) => void) {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).json('Unauthorized!');
        }
        const jwt = authHeader.split(' ')[1];
        const verifyResult = this.jwtService.verify(jwt);
        console.log('verifyResult', verifyResult);
        if (roles.includes(verifyResult.role)) {
          next();
        } else {
          return res.status(403).json('Forbidden!');
        }
      } catch (error) {
        console.error('error authorize role', error);
        return res.status(403).json('Forbidden');
      }
    }
  }
  return AdminAuthorizeMiddlewareCtor
}