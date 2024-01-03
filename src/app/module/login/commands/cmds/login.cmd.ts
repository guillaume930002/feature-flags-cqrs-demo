import { ICommand } from "@nestjs/cqrs";

export class LoginCommand implements ICommand {
  constructor(public user: any) { }
}
