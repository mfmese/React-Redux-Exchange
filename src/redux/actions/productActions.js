import * as actionTypes from "./actionTypes";
import * as parameters from "../../common/Parameters";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}

export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function deleteProductSuccess(product) {
  return { type: actionTypes.DELETE_PRODUCT_SUCCESS, payload: product };
}

export function saveProduct(product) {
  return product.id ? updateProduct(product) : createProduct(product);
}

export function getProducts(categoryId) {
  return function (dispatch) {
    let url =
      parameters.API_SERVER_URL + "/products?userId=" + actionTypes.USER.id;
    if (categoryId) {
      url += "&categoryId=" + categoryId;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSuccess(result)));
  };
}

export function createProduct(product) {
  product.userId = actionTypes.USER.id;

  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/products";

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((result) => dispatch(createProductSuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function updateProduct(product) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/products/" + product.id;

    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((result) => dispatch(updateProductSuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function deleteProduct(productId) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/products/" + productId;

    return fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => dispatch(deleteProductSuccess(productId)));
  };
}
