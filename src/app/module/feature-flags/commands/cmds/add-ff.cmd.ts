import { ICommand } from "@nestjs/cqrs";
import { AddFlagDto } from "../../dto/add-flag.dto";

export class AddFeatureFlagCommand implements ICommand {
  constructor(public data: AddFlagDto) { }
}