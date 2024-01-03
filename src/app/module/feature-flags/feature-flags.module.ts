import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AdminAuthorizeMiddleware } from "../../shared/middleware/admin-authorize.middleware";
import { FeatureFlagsController } from "./feature-flags.controller";
import { FeatureFlagsService } from "./feature-flags.service";
import { FeatureFlags } from "../../entities/feature-flags.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
import { FeatureFlagsCommands } from "./commands/handlers";
import { FeatureFlagsEvents } from "./events/handlers";
import { FeatureFlagsRepository } from "./repository/feature-flags.repository";
import { CqrsModule } from "@nestjs/cqrs";
import { FeatureFlagsQueries } from "./queries/handlers";

@Module({
  imports: [
    TypeOrmModule.forFeature([FeatureFlags]),
    SharedModule,
    CqrsModule
  ],
  controllers: [FeatureFlagsController],
  providers: [
    FeatureFlagsService,
    ...FeatureFlagsCommands,
    ...FeatureFlagsEvents,
    ...FeatureFlagsQueries,
    FeatureFlagsRepository
  ],
})
export class FeatureFlagsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminAuthorizeMiddleware(1)).forRoutes(FeatureFlagsController)
  }
}