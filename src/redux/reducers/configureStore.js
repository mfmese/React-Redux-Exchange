import { createStore, applyMiddleware } from "redux";

import rootReduer from "./index";
import thunk from "redux-thunk";

// import logger from "redux-logger";

//we can use this also instead of logger in applyMiddleware
// const myLogger = (store) => (next) => (action) => {
//   console.log("logged action", action);
//   next(action);
// };

export default function configureStore() {
  return createStore(rootReduer, applyMiddleware(thunk));
}
