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
} from "../../constants/products";

const initialState = {
  prods: {},
  productsLoading: false,

  categories: [],
  categoriesLoading: false,

  selectedProduct: {},
  selectedProductLoading: false,

  loadMoreLoading: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Products
    case GET_PRODUCTS_REQ:
      return {
        ...state,
        prods: {},
        productsLoading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        prods: action.payload,
        productsLoading: false,
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        productsLoading: false,
      };

    // Categories
    case GET_CATEGORIES_REQ:
      return {
        ...state,
        categories: [],
        categoriesLoading: true,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        categoriesLoading: false,
      };
    case GET_CATEGORIES_ERROR:
      return {
        ...state,
        categoriesLoading: false,
      };

    // Products by Category
    case GET_PRODUCTS_BY_CATEGORY_REQ:
      return {
        ...state,
        prods: {},
        productsLoading: true,
      };
    case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        prods: action.payload,
        productsLoading: false,
      };
    case GET_PRODUCTS_BY_CATEGORY_ERROR:
      return {
        ...state,
        productsLoading: false,
      };

    // Product by ID
    case GET_PRODUCT_BY_ID_REQ:
      return {
        ...state,
        selectedProduct: {},
        selectedProductLoading: true,
      };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        selectedProduct: action.payload,
        selectedProductLoading: false,
      };
    case GET_PRODUCT_BY_ID_ERROR:
      return {
        ...state,
        selectedProductLoading: false,
      };

    // Products
    case LOAD_MORE_REQ:
      return {
        ...state,
        loadMoreLoading: true,
      };
    case LOAD_MORE_SUCCESS:
      return {
        ...state,
        prods: {
          products: [...state.prods.products, ...action.payload.products],
          total: action.payload.total,
          skip: action.payload.skip,
          limit: action.payload.limit,
        },
        loadMoreLoading: false,
      };
    case LOAD_MORE_ERROR:
      return {
        ...state,
        loadMoreLoading: false,
      };

    default:
      return state;
  }
};

export default productsReducer;
