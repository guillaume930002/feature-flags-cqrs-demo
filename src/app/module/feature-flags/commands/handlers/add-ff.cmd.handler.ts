import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AddFeatureFlagCommand } from "../cmds/add-ff.cmd";
import { ErrorService } from "../../../../shared/error/error.service";
import { FeatureFlagsRepository } from "../../repository/feature-flags.repository";

@CommandHandler(AddFeatureFlagCommand)
export class AddFeatureFlagCommandHandler implements ICommandHandler<AddFeatureFlagCommand> {

  constructor(
    private ffRepo: FeatureFlagsRepository,
    private errorSvc: ErrorService,
    private publisher: EventPublisher
  ) { }

  async execute(command: AddFeatureFlagCommand): Promise<any> {
    const { data } = command;
    const addFF = await this.ffRepo.addFlag(data);
    
    return addFF;
  }
}
