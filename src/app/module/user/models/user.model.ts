import { AggregateRoot, EventPublisher } from "@nestjs/cqrs";
import { UserAddedEvent } from "../events/evts/user-added.event";

export class UserModel extends AggregateRoot {

  id: number;
  roleId: number;
  username: string;
  hashedPassword: string;
  salt: string;
  email?: string;
  phone?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(
  ) {
    super();
  }

  userAdded(userId: number) {
    this.apply(new UserAddedEvent(userId));
  }
}