import {createAction, props} from "@ngrx/store";
import {OwnCheckIns} from "../models/own-check-ins.model";
import {RequestedCheckIn} from "../models/requested-check-in.model";
import {create} from "ionicons/icons";

export const loadRequestedCheckIns = createAction('[Check-In Store] Load Requested Check-Ins');
export const loadOwnCheckIns = createAction('[Check-In Store] Load Own Check-Ins');
export const setRequestedCheckIns = createAction('[Check-In Store] Set Requested Check-Ins',
  props<{ requestedCheckIns: RequestedCheckIn[] }>())
export const setOwnCheckIns = createAction('[Check-In Store] Set Own Check-Ins',
  props<{ ownCheckIns: OwnCheckIns[] }>())
export const rejectCheckIn = createAction('[Check-In Store] Reject Check-In')
export const confirmCheckIn = createAction('[Check-In Store] Confirm Check-In')

export const errorHandling = createAction('[Check-In Store] Error Handling', props<{ err: any }>())
