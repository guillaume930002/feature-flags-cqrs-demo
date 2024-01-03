import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { LoginCommand } from "../cmds/login.cmd";
import { ErrorService } from "../../../../shared/error/error.service";
import { AuthService } from "../../../../shared/passport/auth.service";

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private errorSvc: ErrorService,
    private publisher: EventPublisher,
    private authService: AuthService
  ) { }

  async execute(command: LoginCommand): Promise<any> {
    console.log('login command handler', command.user);
    const { user } = command;
    if (!user.salt) {
      return this.errorSvc.response(3);
    } else if (user.status != 'A') {
      return this.errorSvc.response(4);
    } else {
      const loginAgg = this.publisher.mergeObjectContext(
        await this.authService.generateToken(user)
      );

      // send welcome email
      loginAgg.sendWelcomeEmail(loginAgg);
      loginAgg.commit();
    }
  }
}
