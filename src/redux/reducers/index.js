import { combineReducers } from "redux";
import productListReducer from "./productListReducer";
import categoryListReducer from "./categoryListReducer";
import stockListReducer from "./stockListReducer";
import categorySaveReducer from "./categorySaveReducer";
import stockOperationListReducer from "./stockOperationListReducer";
import storeListReducer from "./storeListReducer";
import storeSaveReducer from "./storeSaveReducer";
import orderListReducer from "./orderListReducer";
import unitTypeListReducer from "./unitTypeListReducer";
import orderTypeListReducer from "./orderTypeListReducer";
import customerListReducer from "./customerListReducer";
import customerSaveReducer from "./customerSaveReducer";

const rootReducer = combineReducers({
  productListReducer,
  categoryListReducer,
  stockListReducer,
  categorySaveReducer,
  stockOperationListReducer,
  storeListReducer,
  storeSaveReducer,
  orderListReducer,
  unitTypeListReducer,
  orderTypeListReducer,
  customerListReducer,
  customerSaveReducer,
});

export default rootReducer;
