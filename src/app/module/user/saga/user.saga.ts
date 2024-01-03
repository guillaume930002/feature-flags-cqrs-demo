import { Injectable } from "@nestjs/common";
import { Saga, ofType } from "@nestjs/cqrs";
import { Observable, map } from "rxjs";
import { UserAddedEvent } from "../events/evts/user-added.event";

@Injectable()
export class UserSaga {
  @Saga()
  userAdded = (event$: Observable<any>): Observable<any> => {
    return event$.pipe(
      ofType(UserAddedEvent),
      map(event => {
        console.log('user added event: ', event);
      })
    )
  }
}
