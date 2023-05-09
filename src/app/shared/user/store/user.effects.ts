import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../services/user.service";
import {onErrorAction, saveFirstUserInformations, setCurrentUser} from "./user.actions";
import {catchError, map, Observable, of, switchMap, tap} from "rxjs";
import {Action} from "@ngrx/store";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserEffects {

  saveFirstTimeInfosFromUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(saveFirstUserInformations),
    switchMap((action) => this.userService.userFirstTimeInformation(action.user).pipe(
      map(() => setCurrentUser({user: action.user})),
      catchError((err) => of(onErrorAction(err))),
    )),
  ))

  constructor(private actions$: Actions, private userService: UserService, private router: Router) {

  }
}
