import { IQuery } from "@nestjs/cqrs";

export class GetFFByIdQuery implements IQuery {
  constructor(public id: number) { }
}
