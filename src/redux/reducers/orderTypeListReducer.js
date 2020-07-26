import * as actionTypes from "../actions/actionTypes";

import initialState from "./initialState";

export default function orderTypeListReducer(
  state = initialState.orderTypes,
  action
) {
  switch (action.type) {
    case actionTypes.GET_ORDER_TYPES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
