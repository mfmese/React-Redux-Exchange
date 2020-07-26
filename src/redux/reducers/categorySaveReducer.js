import * as actionTypes from "../actions/actionTypes";

import initialState from "./initialState";

export default function categorySaveReducer(
  state = initialState.saveCategory,
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return action.payload;
    case actionTypes.UPDATE_CATEGORY_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
