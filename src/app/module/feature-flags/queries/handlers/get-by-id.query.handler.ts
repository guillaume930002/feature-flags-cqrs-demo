import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetFFByIdQuery } from "../queries/get-by-id.query";
import { FeatureFlagsRepository } from "../../repository/feature-flags.repository";

@QueryHandler(GetFFByIdQuery)
export class GetFFByIdQueryHandler implements IQueryHandler<GetFFByIdQuery> {
  constructor(
    private ffRepo: FeatureFlagsRepository
  ) { }
  async execute(query: GetFFByIdQuery): Promise<any> {
    const flag = await this.ffRepo.getFlagById(query.id);

    return flag;
  }
}
