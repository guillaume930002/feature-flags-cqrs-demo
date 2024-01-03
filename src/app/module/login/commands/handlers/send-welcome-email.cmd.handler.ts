import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SendWelcomeEmailCommand } from "../cmds/send-welcome-email.cmd";
import { ErrorService } from "../../../../shared/error/error.service";

@CommandHandler(SendWelcomeEmailCommand)
export class SendWelcomeEmailCommandHandler implements ICommandHandler<SendWelcomeEmailCommand> {

  constructor(
    private errorSvc: ErrorService
  ) { }

  async execute(command: SendWelcomeEmailCommand): Promise<any> {
    console.log('send welcome email cmd');
    console.log('command', command);
    // send email logic code here
    return this.errorSvc.response(0);
  }
}
