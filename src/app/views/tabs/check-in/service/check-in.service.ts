import {Injectable} from "@angular/core";
import {OwnCheckIns} from "../models/own-check-ins.model";
import {RequestedCheckIn} from "../models/requested-check-in.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private httpClient: HttpClient) {
  }


  public loadOwnCheckIns() {
    return this.httpClient.get<OwnCheckIns[]>('')
  }

  public loadRequestedCheckIns() {
    return this.httpClient.get<RequestedCheckIn[]>('')
  }
}
