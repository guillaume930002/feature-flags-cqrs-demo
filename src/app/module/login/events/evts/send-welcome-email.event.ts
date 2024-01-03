import { IEvent } from "@nestjs/cqrs";

export class SendWelcomeEmailEvent implements IEvent {
  constructor(public user: any) { }
}
