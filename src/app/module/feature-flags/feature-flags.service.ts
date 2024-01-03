import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeatureFlags } from "../../entities/feature-flags.entity";
import { Feature, Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { ErrorService } from "../../shared/error/error.service";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllFFQuery } from "./queries/queries/get-all.query";
import { GetAllFFDto } from "./dto/get-all.dto";
import { GetFFByIdQuery } from "./queries/queries/get-by-id.query";
import { AddFeatureFlagCommand } from "./commands/cmds/add-ff.cmd";
import { AddFlagDto } from "./dto/add-flag.dto";
import { UpdateFlagDto } from "./dto/update-flag.dto";
import { UpdateFeatureFlagCommand } from "./commands/cmds/update-ff.cmd";

@Injectable()
export class FeatureFlagsService {
  constructor(
    private readonly errorSvc: ErrorService,
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) { }

  async getAllFFlags(query: GetAllFFDto): Promise<any> {
    try {
      const flags = await this.queryBus.execute(new GetAllFFQuery(query));
      return this.errorSvc.response(0, flags);
    } catch (error) {
      console.error('error getAllFFlags: ', error);
      return this.errorSvc.response(1);
    }
  }

  async getFlag(id: number): Promise<any> {

    try {
      const flag = await this.queryBus.execute(new GetFFByIdQuery(id));
      return this.errorSvc.response(0, flag);
    } catch (error) {
      console.error('error getFlag: ', error);
      return this.errorSvc.response(1);
    }
  }

  async addFlag(body: AddFlagDto): Promise<any> {
    try {
      const data = await this.commandBus.execute(new AddFeatureFlagCommand(body));
      return this.errorSvc.response(0, data);
    } catch (error) {
      console.error('error addFlag: ', error.routine);
      if (error.routine == '_bt_check_unique') {
        return this.errorSvc.response(0, 'duplicated');
      }
      return this.errorSvc.response(1);
    }
  }

  async updateFlag(body: UpdateFlagDto): Promise<any> {
    try {
      const data = await this.commandBus.execute(new UpdateFeatureFlagCommand(body));
      return this.errorSvc.response(0, data);
    } catch (error) {
      console.error('error updateFlag: ', error);
      return this.errorSvc.response(1);
    }
  }

  async isEnabled(accountId, name) {
    const featureFlag = await this.queryBus.execute(new GetAllFFQuery({accountId, name}))
    if (!featureFlag) {
      return false;
    }
    return featureFlag.isEnabled;
  }
}