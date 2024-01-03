import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserAddedEvent } from "../evts/user-added.event";

@EventsHandler(UserAddedEvent)
export class UserAddedEventHandler implements IEventHandler<UserAddedEvent> {
  handle(event: UserAddedEvent) {
    console.log('UserAddedEvent: ', event);
  }
}
