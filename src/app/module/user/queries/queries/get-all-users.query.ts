import { IQuery } from "@nestjs/cqrs";
import { GetAllUsersDto } from "../../dto/get-all-users.dto";

export class GetAllUsersQuery implements IQuery {
  constructor(public data: GetAllUsersDto) { }
}