import * as actionTypes from "../actions/actionTypes";

import initialState from "./initialState";

export default function stockListReducer(state = initialState.stocks, action) {
  switch (action.type) {
    case actionTypes.GET_STOCKS_SUCCESS:
      return action.payload;
    case actionTypes.DELETE_STOCK_SUCCESS:
      return state.filter((stock) => stock.id !== action.payload);
    default:
      return state;
  }
}
