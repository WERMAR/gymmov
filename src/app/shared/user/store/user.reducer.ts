import {createReducer, on} from "@ngrx/store";
import {UserState} from "./user.state";
import {onErrorAction, reset, setCurrentUser, setFriends} from "./user.actions";
import {IUser} from "../model/user.interface";

export const INITIAL_STATE: UserState = {
  currentUser: undefined,
  friends: undefined,
  error: undefined
}

const handleSetCurrentUser = (state: UserState, props: { user: IUser }) => ({
  ...state,
  currentUser: props.user
})

const handleSetFriends = (state: UserState, props: { friends: IUser[] }) => ({
  ...state,
  friends: props.friends
})

const handleError = (state: UserState, props: { err: any }) => ({
  ...state,
  error: props.err
})

const handleResetAction = (state: UserState) => ({
  currentUser: undefined,
  friends: undefined,
  error: undefined
});

export const userReducer = createReducer(
  INITIAL_STATE,
  on(setCurrentUser, handleSetCurrentUser),
  on(setFriends, handleSetFriends),
  on(onErrorAction, handleError),
  on(reset, handleResetAction))
