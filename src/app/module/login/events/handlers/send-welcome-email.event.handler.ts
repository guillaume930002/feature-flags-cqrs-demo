import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { SendWelcomeEmailEvent } from "../evts/send-welcome-email.event";

@EventsHandler(SendWelcomeEmailEvent)
export class SendWelcomeEmailEventHandler implements IEventHandler<SendWelcomeEmailEvent> {
  constructor() { }

  handle(event: SendWelcomeEmailEvent) {
    //send email
    console.log('Email sent event!');
  }
}
