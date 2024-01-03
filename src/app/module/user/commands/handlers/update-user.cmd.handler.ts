import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "../cmds/update-user.cmd";
import { UserRepository } from "../../repository/user.repository";
import { ErrorService } from "../../../../shared/error/error.service";
import { plainToInstance } from "class-transformer";
import { UserModel } from "../../models/user.model";

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private userRepo: UserRepository,
    private errorSvc: ErrorService,
    private publisher: EventPublisher
  ) {

  }
  async execute(command: UpdateUserCommand): Promise<any> {
    const { id, data } = command;
    const updateUser = await this.userRepo.updateUser(id, data);
    const userAgg = this.publisher.mergeObjectContext(
      plainToInstance(UserModel, updateUser)
    );

    console.log('userAgg', userAgg);
    return this.errorSvc.response(0, { id });
  }
}
