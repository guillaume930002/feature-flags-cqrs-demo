import { ICommand } from "@nestjs/cqrs";

export class SendWelcomeEmailCommand implements ICommand {
  constructor(
    public user: {
      id: number,
      name: string,
      role: string,
      status: string,
      token: string
    }
  ) { }
}
