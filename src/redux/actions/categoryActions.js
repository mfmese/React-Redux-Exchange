import * as actionTypes from "./actionTypes";
import * as parameters from "../../common/Parameters";

export function getCategoriesSuccess(categories) {
  return { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: categories };
}

export function createCategorySuccess(category) {
  return { type: actionTypes.CREATE_CATEGORY_SUCCESS, payload: category };
}

export function updateCategorySuccess(category) {
  return { type: actionTypes.UPDATE_CATEGORY_SUCCESS, payload: category };
}

export function deleteCategorySuccess(category) {
  return { type: actionTypes.DELETE_CATEGORY_SUCCESS, payload: category };
}

export function saveCategory(category) {
  return category.id ? updateCategory(category) : createCategory(category);
}

export function getCategories() {
  return function (dispatch) {
    let url =
      parameters.API_SERVER_URL + "/categories?userId=" + actionTypes.USER.id;
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getCategoriesSuccess(result)));
  };
}

export function createCategory(category) {
  category.userId = actionTypes.USER.id;

  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/categories";

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((response) => response.json())
      .then((result) => dispatch(createCategorySuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function updateCategory(category) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/categories/" + category.id;

    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((response) => response.json())
      .then((result) => dispatch(updateCategorySuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function deleteCategory(categoryId) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/categories/" + categoryId;

    return fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => dispatch(deleteCategorySuccess(categoryId)));
  };
}
