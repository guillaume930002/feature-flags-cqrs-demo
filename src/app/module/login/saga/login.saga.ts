import { Injectable } from "@nestjs/common";
import { ICommand, Saga, ofType } from "@nestjs/cqrs";
import { Observable, map } from "rxjs";
import { SendWelcomeEmailEvent } from "../events/evts/send-welcome-email.event";
import { SendWelcomeEmailCommand } from "../commands/cmds/send-welcome-email.cmd";

@Injectable()
export class LoginSaga {
  @Saga()
  sendWelcomeEmail = (event$: Observable<any>): Observable<ICommand> => {
    return event$.pipe(
      ofType(SendWelcomeEmailEvent),
      map(event => new SendWelcomeEmailCommand(event.user))
    )
  }
}