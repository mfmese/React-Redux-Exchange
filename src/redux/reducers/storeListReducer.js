import * as actionTypes from "../actions/actionTypes";

import initialState from "./initialState";

export default function storeListReducer(state = initialState.stores, action) {
  switch (action.type) {
    case actionTypes.GET_STORES_SUCCESS:
      return action.payload;
    case actionTypes.DELETE_STORE_SUCCESS:
      return state.filter((store) => store.id !== action.payload);
    default:
      return state;
  }
}
