import { AggregateRoot } from "@nestjs/cqrs";
import { SendWelcomeEmailEvent } from "../events/evts/send-welcome-email.event";

export class LoginModel extends AggregateRoot {
  constructor(
    public user: {
      id: number,
      name: string,
      role: number,
      status: string,
      token: string
    }
  ) {
    super();
  }

  sendWelcomeEmail(user: any) {
    this.apply(new SendWelcomeEmailEvent(user));
  }
}