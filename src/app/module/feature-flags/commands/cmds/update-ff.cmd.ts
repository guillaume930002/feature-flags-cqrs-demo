import { ICommand } from "@nestjs/cqrs";
import { UpdateFlagDto } from "../../dto/update-flag.dto";

export class UpdateFeatureFlagCommand implements ICommand {
  constructor(public data: UpdateFlagDto) { }
}
