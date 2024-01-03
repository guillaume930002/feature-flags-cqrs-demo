import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UpdateFeatureFlagEvent } from "../evts/update-ff.event";

@EventsHandler(UpdateFeatureFlagEvent)
export class UpdateFeatureFlagEventHandler implements IEventHandler<UpdateFeatureFlagEvent> {
  handle(event: UpdateFeatureFlagEvent) {
    console.log('update flag event: ', event.id, event.data);
  }

}