import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { LoginCommand } from "./commands/cmds/login.cmd";

@Injectable()
export class LoginService {
  constructor(
    private readonly commandBus: CommandBus
  ) { }

  async login(req): Promise<any> {
    const cmdRes = await this.commandBus.execute(new LoginCommand(req.user))
    console.log('login cmdRes: ', cmdRes);
    return cmdRes;
  }
}
