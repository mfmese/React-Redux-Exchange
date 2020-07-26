import * as actionTypes from "../actions/actionTypes";

import initialState from "./initialState";

export default function userListReducer(state = initialState.user, action) {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESSFUL:
      return action.payload;

    default:
      return state;
  }
}
