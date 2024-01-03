import { ICommand } from "@nestjs/cqrs";
import { UpsertUserDto } from "../../dto/upsert-user.dto";

export class AddUserCommand implements ICommand {
  constructor(
    public readonly data: UpsertUserDto
  ) { }
}
