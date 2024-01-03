import { EventPublisher, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserRepository } from "../../repository/user.repository";
import { ErrorService } from "../../../../shared/error/error.service";
import { GetUserByIdQuery } from "../queries/get-user-by-id.query";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    private userRepo: UserRepository,
    private publisher: EventPublisher,
    private errorSvc: ErrorService
  ) { }

  async execute(query: GetUserByIdQuery): Promise<any> {
    const userAgg = this.publisher.mergeObjectContext(
      await this.userRepo.getUserById(query.id)
    );

    return this.errorSvc.response(0, userAgg);
  }
}