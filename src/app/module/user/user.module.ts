import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
import { Users } from "../../entities/users.entity";
import { FeatureFlagsService } from "../feature-flags/feature-flags.service";
import { FeatureFlags } from "../../entities/feature-flags.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { UserRepository } from "./repository/user.repository";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { QueryHandlers } from "./queries/handlers";
import { UserSaga } from "./saga/user.saga";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, FeatureFlags]),
    SharedModule,
    CqrsModule
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    FeatureFlagsService,
    UserRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    UserSaga
  ]
})
export class UserModule { }
