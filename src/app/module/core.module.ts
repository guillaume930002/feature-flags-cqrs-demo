import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { LoginModule } from "./login/login.module";
import { FeatureFlagsModule } from "./feature-flags/feature-flags.module";

@Module({
  imports: [
    UserModule,
    LoginModule,
    FeatureFlagsModule
  ],
  exports: [
    UserModule,
    LoginModule,
    FeatureFlagsModule
  ]
})
export class CoreModule { }