import { GetAllFFQueryHandler } from "./get-all.query.handler";
import { GetFFByIdQueryHandler } from "./get-by-id.query.handler";

export const FeatureFlagsQueries = [
  GetAllFFQueryHandler,
  GetFFByIdQueryHandler
];
