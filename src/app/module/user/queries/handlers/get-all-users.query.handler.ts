import { EventPublisher, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllUsersQuery } from "../queries/get-all-users.query";
import { UserRepository } from "../../repository/user.repository";
import { ErrorService } from "../../../../shared/error/error.service";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersQueryHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(
    private userRepo: UserRepository,
    private publisher: EventPublisher,
    private errorSvc: ErrorService
  ) { }

  async execute(query: GetAllUsersQuery): Promise<any> {
    const userAgg = this.publisher.mergeObjectContext(
      await this.userRepo.getAll(query.data)
    );

    return this.errorSvc.response(0, userAgg);
  }
}