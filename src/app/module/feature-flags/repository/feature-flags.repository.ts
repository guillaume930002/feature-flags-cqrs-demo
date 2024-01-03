import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeatureFlags } from "../../../entities/feature-flags.entity";
import { ILike, Repository } from "typeorm";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FeatureFlagsRepository {
  constructor(
    @InjectRepository(FeatureFlags)
    private readonly ffRepo: Repository<FeatureFlags>,
  ) { }

  async getAllFFlags(query): Promise<any> {
    try {
      const { accountId, name, isEnabled } = query;
      const flags = await this.ffRepo.find({
        where: {
          accountId: accountId ? accountId : undefined,
          name: name ? ILike('%' + name + '%') : undefined,
          isEnabled: isEnabled ? isEnabled : undefined
        }
      });
      return flags;
    } catch (error) {
      console.error('err getAllFFlags: ', error);
      return error;
    }
  }

  async getFlagById(id): Promise<any> {
    try {
      const flag = await this.ffRepo.findOne(id);
      return flag;
    } catch (error) {
      console.error('error getFlag: ', error);
      return error;
    }
  }

  async addFlag(data): Promise<any> {
    try {
      const dataEntity = plainToInstance(FeatureFlags, data);
      const result = await this.ffRepo.save(dataEntity);
      return result;
    } catch (error) {
      console.error('error addFlag: ', error);
      return error
    }
  }

  async updateFlag(id, data): Promise<any> {
    try {
      const dataEntity = plainToInstance(FeatureFlags, data);
      const result = await this.ffRepo.update(id, dataEntity);
      return result;
    } catch (error) {
      console.error('error updateFlag: ', error);
      return error;
    }
  }

  async isEnabled(accountId, name) {
    const featureFlag = await this.ffRepo.findOne({ where: { accountId, name } });
    if (!featureFlag) {
      return false;
    }
    return featureFlag.isEnabled;
  }
}