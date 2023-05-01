import {createReducer, on} from "@ngrx/store";
import {CheckInState} from "./check-in.state";
import {setOwnCheckIns, setRequestedCheckIns} from "./check-in.actions";
import {OwnCheckIns} from "../models/own-check-ins.model";
import {RequestedCheckIn} from "../models/requested-check-in.model";

export const INITIAL_STATE: CheckInState = {
  ownCheckIns: undefined,
  requestedCheckIn: undefined
}

const onSetOwnCheckIns = (state: CheckInState, props: { ownCheckIns: OwnCheckIns[] }) => ({
  ...state,
  ownCheckIns: props.ownCheckIns
});

const onSetRequestedCheckIns = (state: CheckInState, props: { requestedCheckIns: RequestedCheckIn[] }) => ({
  ...state,
  requestedCheckIns: props.requestedCheckIns
})


export const reducer = createReducer(
  INITIAL_STATE,
  on(setOwnCheckIns, onSetOwnCheckIns),
  on(setRequestedCheckIns, onSetRequestedCheckIns)
)
