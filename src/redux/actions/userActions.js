import * as actionTypes from "./actionTypes";
import * as parameters from "../../common/Parameters";

export function getUserSuccess(user) {
  return { type: actionTypes.GET_USER_SUCCESSFUL, payload: user };
}

export function getUser() {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/users/1";

    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getUserSuccess(result)));
  };
}
