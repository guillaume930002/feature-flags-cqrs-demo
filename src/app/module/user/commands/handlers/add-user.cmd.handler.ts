import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AddUserCommand } from "../cmds/add-user.cmd";
import { UserRepository } from "../../repository/user.repository";
import { ErrorService } from "../../../../shared/error/error.service";
import { plainToInstance } from "class-transformer";
import { UserModel } from "../../models/user.model";

@CommandHandler(AddUserCommand)
export class AddUserCommandHandler implements ICommandHandler<AddUserCommand> {
  constructor(
    private userRepo: UserRepository,
    private eventPublisher: EventPublisher,
    private readonly errorSvc: ErrorService
  ) { }

  async execute(command: AddUserCommand): Promise<any> {
    const addUser = await this.userRepo.addUser(command.data);
    const userAgg = this.eventPublisher.mergeObjectContext(
      plainToInstance(UserModel, addUser)
    );
    console.log('result', userAgg);

    // notify event added
    // const newId = userAgg ? userAgg.id : -1;
    // userAgg.userAdded(newId);
    // userAgg.commit();
    return this.errorSvc.response(0, userAgg);
  }
}
