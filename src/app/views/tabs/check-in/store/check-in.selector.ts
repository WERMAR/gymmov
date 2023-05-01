import {createSelector, select} from "@ngrx/store";
import {CheckInState} from "./check-in.state";

const state = (state: CheckInState) => state;

export const selectOwnCheckIns$ = createSelector(state, (state: CheckInState) => state.ownCheckIns);
export const selectRequestedCheckIns$ = createSelector(state, (state: CheckInState) => state.requestedCheckIn);
