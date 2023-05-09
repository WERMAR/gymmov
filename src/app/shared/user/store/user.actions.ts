import {createAction, props} from "@ngrx/store";
import {IUser} from "../model/user.interface";

export const saveFirstUserInformations = createAction('[User Store] Save First User Information´s', props<{
  user: IUser
}>());

export const setCurrentUser = createAction('[User Store] Set current User', props<{ user: IUser }>())
export const setFriends = createAction('[User Store] Set current User', props<{ friends: IUser[] }>())


export const onErrorAction = createAction('[User Store] Error', props<{ err: any }>())
export const reset = createAction('[User Store] Reset')
