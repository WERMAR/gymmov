import {IUser} from "../model/user.interface";

export const USER_FEAUTRE_NAME = 'user-data';

export interface UserState {
  currentUser: IUser | undefined,
  friends: IUser[] | undefined,
  error: any | undefined
}
