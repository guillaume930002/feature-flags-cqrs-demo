import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  NotFoundException,
} from '@nestjs/common';
import { FeatureFlagsService } from '../../module/feature-flags/feature-flags.service';
import { JwtService } from '@nestjs/jwt';
import { ErrorService } from '../error/error.service';

export function FeatureFlagGuard(featureFlagName: string) {

  @Injectable()
  class FeatureFlagGuardMixin implements CanActivate {
    constructor(
      readonly featureFlagsService: FeatureFlagsService,
      readonly jwtService: JwtService,
      readonly errorSvc: ErrorService
    ) { }

    async canActivate(context: ExecutionContext) {
      const httpContext = context.switchToHttp();
      const request = httpContext.getRequest();
      const authHeader = request.headers.authorization;
      const token = authHeader.split(' ')[1];
      // console.log('jwt', token);
      const decodedJwt = this.jwtService.decode(token);
      // console.log('decodedJwt', decodedJwt.id);
      const isEnabled = await this.featureFlagsService.isEnabled(decodedJwt.id, featureFlagName);
      console.log('isEnabled', isEnabled);
      if (!isEnabled) {
        throw new NotFoundException(`Cannot ${request.method} ${request.url}`);
      }
      return true;
    }
  }

  const guard = mixin(FeatureFlagGuardMixin);
  return guard;
}
