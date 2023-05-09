import {createSelector} from "@ngrx/store";
import {UserState} from "./user.state";

const state = (state: UserState) => state;
export const selectCurrentUser = createSelector(state, (state: UserState) => state.currentUser);
export const selectFriends = createSelector(state, (state: UserState) => state.friends);
export const selectError = createSelector(state, (state: UserState) => state.error);
