import {RequestedCheckIn} from "../models/requested-check-in.model";
import {OwnCheckIns} from "../models/own-check-ins.model";

export interface CheckInState {
  requestedCheckIn: RequestedCheckIn[] | undefined,
  ownCheckIns: OwnCheckIns[] | undefined
}
