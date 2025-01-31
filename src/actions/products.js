import axios from "axios";
import {
  GET_PRODUCTS_REQ,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_CATEGORIES_REQ,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  GET_PRODUCTS_BY_CATEGORY_REQ,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_ERROR,
  GET_PRODUCT_BY_ID_REQ,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_ERROR,
  LOAD_MORE_REQ,
  LOAD_MORE_SUCCESS,
  LOAD_MORE_ERROR,
} from "../constants/products";

const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_REQ });
      const result = await axios.get(
        `https://dummyjson.com/products?select=id,title,price,thumbnail,rating,category&limit=20&skip=0`
      );
      if (result.status == "200") {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: result.data,
        });
      } else {
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: "Api failed" });
      }
    } catch (e) {
      dispatch({ type: GET_PRODUCTS_ERROR, payload: e });
    }
  };
};

const getProductByCategory = (url) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_BY_CATEGORY_REQ });
      const result = await axios.get(url);
      if (result.status == "200") {
        dispatch({
          type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
          payload: result.data,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
          payload: "Api failed",
        });
      }
    } catch (e) {
      dispatch({ type: GET_PRODUCTS_BY_CATEGORY_ERROR, payload: e });
    }
  };
};

const getProductById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCT_BY_ID_REQ });
      const result = await axios.get(`https://dummyjson.com/products/${id}`);
      if (result.status == "200") {
        dispatch({
          type: GET_PRODUCT_BY_ID_SUCCESS,
          payload: result.data,
        });
      } else {
        dispatch({
          type: GET_PRODUCT_BY_ID_SUCCESS,
          payload: "Api failed",
        });
      }
    } catch (e) {
      dispatch({ type: GET_PRODUCT_BY_ID_ERROR, payload: e });
    }
  };
};

const getCategories = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_CATEGORIES_REQ });
      const result = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      if (result.status == "200") {
        dispatch({
          type: GET_CATEGORIES_SUCCESS,
          payload: result.data,
        });
      } else {
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: "Api failed" });
      }
    } catch (e) {
      dispatch({ type: GET_CATEGORIES_ERROR, payload: e });
    }
  };
};

const loadMoreProducts = (limit, skip) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_MORE_REQ });
      const result = await axios.get(
        `https://dummyjson.com/products?select=id,title,price,thumbnail,rating,category&limit=${limit}&skip=${skip}`
      );
      if (result.status == "200") {
        dispatch({
          type: LOAD_MORE_SUCCESS,
          payload: result.data,
        });
      } else {
        dispatch({ type: LOAD_MORE_SUCCESS, payload: "Api failed" });
      }
    } catch (e) {
      dispatch({ type: LOAD_MORE_ERROR, payload: e });
    }
  };
};

const searchProducts = (query) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_REQ });
      const result = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
      );
      if (result.status == "200") {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: result.data,
        });
      } else {
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: "Api failed" });
      }
    } catch (e) {
      dispatch({ type: GET_PRODUCTS_ERROR, payload: e });
    }
  };
};

export {
  getProducts,
  getProductByCategory,
  getProductById,
  getCategories,
  loadMoreProducts,
  searchProducts,
};
