import * as actionTypes from "../actions/actionTypes";

import initialState from "./initialState";

export default function unitTypeListReducer(
  state = initialState.unitTypes,
  action
) {
  switch (action.type) {
    case actionTypes.GET_UNIT_TYPES_SUCCESS:
      return action.payload;
    case actionTypes.DELETE_UNIT_TYPE_SUCCESS:
      return state.filter((unitType) => unitType.id !== action.payload);
    default:
      return state;
  }
}
