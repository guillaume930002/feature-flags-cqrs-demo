import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { SharedModule } from '../../shared/shared.module';
import { Users } from '../../entities/users.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { LoginCommandHandlers } from './commands/handlers';
import { LoginSaga } from './saga/login.saga';
import { LoginEventHandlers } from './events/handlers';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Users]),
    CqrsModule
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    ...LoginCommandHandlers,
    ...LoginEventHandlers,
    LoginSaga
  ]
})
export class LoginModule { }
