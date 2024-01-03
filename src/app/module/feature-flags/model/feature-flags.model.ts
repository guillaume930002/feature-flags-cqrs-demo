import { AggregateRoot } from "@nestjs/cqrs";
import { AddFeatureFlagEvent } from "../events/evts/add-ff.event";
import { UpdateFeatureFlagEvent } from "../events/evts/update-ff.event";

export class FeatureFlagsModel extends AggregateRoot {

  constructor(
    public id: number,
    public accountId: number,
    public name: string,
    public isEnabled: boolean,
  ) {
    super();
  }

  createFlag(id: number) {
    this.apply(new AddFeatureFlagEvent(id));
  }

  updateFlag(id: number, data: any) {
    this.apply(new UpdateFeatureFlagEvent(id, data));
  }
}
