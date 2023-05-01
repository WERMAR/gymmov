import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {errorHandling, loadRequestedCheckIns, setOwnCheckIns, setRequestedCheckIns} from "./check-in.actions";
import {CheckInService} from "../service/check-in.service";
import {OwnCheckIns} from "../models/own-check-ins.model";

@Injectable({
  providedIn: "root"
})
export class CheckInEffects {

  loadCheckInData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRequestedCheckIns),
      switchMap(() => this.checkInService.loadRequestedCheckIns()
        .pipe(
          map((result) => setRequestedCheckIns({requestedCheckIns: result})),
          catchError((err) => of(errorHandling(err)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private checkInService: CheckInService) {

  }

}
