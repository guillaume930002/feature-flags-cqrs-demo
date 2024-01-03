import { IEvent } from "@nestjs/cqrs";

export class UserAddedEvent implements IEvent {
  constructor(
    public readonly userId: number
  ) { }
}