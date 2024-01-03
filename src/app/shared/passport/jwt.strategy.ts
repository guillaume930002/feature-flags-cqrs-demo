import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const config = new ConfigService();
    // console.log(config.get('PUBLIC_KEY').replace(/\\n/gm, '\n').replace(/\"+/g, ''));
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('PUBLIC_KEY').replace(/\\n/gm, '\n').replace(/\"+/g, ''),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
