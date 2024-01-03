import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorService } from '../error/error.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly errorService: ErrorService
  ) {
    super(LocalStrategy.name);
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('body', username, password);
    const user = await this.authService.validateUser(username, password);
    console.log('body', username, password);
    if (!user) {
      throw new UnauthorizedException(this.errorService.response(401));
    }
    return user;
  }
}
