import { IEvent } from "@nestjs/cqrs";

export class UpdateFeatureFlagEvent implements IEvent {
  constructor(
    public id: number,
    public data: any
  ) { }
}
