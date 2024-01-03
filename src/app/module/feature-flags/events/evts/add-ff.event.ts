import { IEvent } from "@nestjs/cqrs";

export class AddFeatureFlagEvent implements IEvent {
  constructor(public id: number) { }
}
