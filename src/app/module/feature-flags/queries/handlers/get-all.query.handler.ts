import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllFFQuery } from "../queries/get-all.query";
import { FeatureFlagsRepository } from "../../repository/feature-flags.repository";

@QueryHandler(GetAllFFQuery)
export class GetAllFFQueryHandler implements IQueryHandler<GetAllFFQuery> {
  constructor(
    private ffRepo: FeatureFlagsRepository
  ) { }

  async execute(query: GetAllFFQuery): Promise<any> {
    const result = await this.ffRepo.getAllFFlags(query.data);
    return result;
  }
}