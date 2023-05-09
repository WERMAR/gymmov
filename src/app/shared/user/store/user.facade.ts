import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {UserState} from "./user.state";
import {selectCurrentUser, selectError, selectFriends} from "./user.selectors";
import {saveFirstUserInformations} from "./user.actions";
import {IUser} from "../model/user.interface";

@Injectable({
  providedIn: "root"
})
export class UserFacade {

  currentUser$ = this.userStore.select(selectCurrentUser);
  friends$ = this.userStore.select(selectFriends);
  error$ = this.userStore.select(selectError)

  constructor(private readonly userStore: Store<UserState>) {
  }

  saveFirstTimeInformation(user: IUser): void {
    console.log('called')
    this.userStore.dispatch(saveFirstUserInformations({user}))
  }

}
