import { ICommand } from "@nestjs/cqrs";
import { UpsertUserDto } from "../../dto/upsert-user.dto";

export class UpdateUserCommand implements ICommand {
  constructor(public id: number, public data: UpsertUserDto) { }
}
