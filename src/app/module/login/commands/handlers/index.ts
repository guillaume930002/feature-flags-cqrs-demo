import { LoginCommandHandler } from "./login.cmd.handler";
import { SendWelcomeEmailCommandHandler } from "./send-welcome-email.cmd.handler";

export const LoginCommandHandlers = [
  LoginCommandHandler,
  SendWelcomeEmailCommandHandler
];