import { Controller, Post, HttpCode, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {

  constructor(
    private loginService: LoginService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('')
  @HttpCode(200)
  async login(@Request() req) {
    return this.loginService.login(req);
  }
}
