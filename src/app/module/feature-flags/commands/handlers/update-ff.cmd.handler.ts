import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateFeatureFlagCommand } from "../cmds/update-ff.cmd";
import { ErrorService } from "../../../../shared/error/error.service";
import { FeatureFlagsRepository } from "../../repository/feature-flags.repository";

@CommandHandler(UpdateFeatureFlagCommand)
export class UpdateFeatureFlagCommandHandler implements ICommandHandler<UpdateFeatureFlagCommand> {
  constructor(
    private ffRepo: FeatureFlagsRepository,
  ) { }

  async execute(command: UpdateFeatureFlagCommand): Promise<any> {
    const { data } = command;
    const result = await this.ffRepo.updateFlag(data.id, data);

    return result;
  }

}