import { Module } from "@nestjs/common";
import { ErrorService } from "./error/error.service";
import { EncryptService } from "./encrypt/encrypt.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeatureFlags } from "../entities/feature-flags.entity";
import { AuthService } from "./passport/auth.service";
import { LocalStrategy } from "./passport/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { Users } from "../entities/users.entity";
import { PassportModule } from "@nestjs/passport";
import { ConfigService } from "../config/config.service";
import { JwtStrategy } from "./passport/jwt.strategy";

const config = new ConfigService();
const ISSUER = 'feature-flags-example';
const publicKeyRead = config.get('PUBLIC_KEY').replace(/\\n/gm, '\n').replace(/\"+/g, '');
const privateKeyRead = config.get('PRIVATE_KEY').replace(/\\n/gm, '\n').replace(/\"+/g, '');

@Module({
  imports: [
    TypeOrmModule.forFeature([FeatureFlags, Users]),
    PassportModule,
    JwtModule.register({
      publicKey: publicKeyRead,
      privateKey: privateKeyRead,
      signOptions: {
        expiresIn: '1d',
        algorithm: 'RS256',
        issuer: ISSUER,
      },
    }),
  ],
  providers: [
    ErrorService,
    EncryptService,
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [
    ErrorService,
    EncryptService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtModule
  ]
})
export class SharedModule { }
