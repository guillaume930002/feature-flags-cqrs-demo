import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AddFeatureFlagEvent } from "../evts/add-ff.event";

@EventsHandler(AddFeatureFlagEvent)
export class AddFeatureFlagEventHandler implements IEventHandler<AddFeatureFlagEvent> {
  handle(event: AddFeatureFlagEvent) {
    console.log('add flag event: ', event.id);
  }
}
