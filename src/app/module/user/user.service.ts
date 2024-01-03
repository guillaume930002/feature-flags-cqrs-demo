import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AddUserCommand } from "./commands/cmds/add-user.cmd";
import { UpsertUserDto } from "./dto/upsert-user.dto";
import { UpdateUserCommand } from "./commands/cmds/update-user.cmd";
import { GetAllUsersQuery } from "./queries/queries/get-all-users.query";
import { GetUserByIdQuery } from "./queries/queries/get-user-by-id.query";
import { GetAllUsersDto } from "./dto/get-all-users.dto";

@Injectable()
export class UserService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) { }

  async addUser(body: UpsertUserDto): Promise<any> {
    return this.commandBus.execute(new AddUserCommand(body));
  }

  async updateUser(body: UpsertUserDto): Promise<any> {
    return this.commandBus.execute(new UpdateUserCommand(+body.id, body));
  }

  async getAll(query: GetAllUsersDto): Promise<any> {
    return this.queryBus.execute(new GetAllUsersQuery(query));
  }

  async getUserById(id): Promise<any> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }
}
