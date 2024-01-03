import { IQuery } from "@nestjs/cqrs";
import { GetAllFFDto } from "../../dto/get-all.dto";

export class GetAllFFQuery implements IQuery {
  constructor(public data: GetAllFFDto) { }
}
