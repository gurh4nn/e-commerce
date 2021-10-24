import {
  FETCH_START,
  FETCH_SUCCESS,
  PRODUCT_LIST,
  SEND_OFFER,
} from "redux/actions/types";
const INITIAL_STATE = {
  loading: true,
  products: [],
  offered: false,
};

const product = (state = INITIAL_STATE, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case FETCH_START:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, loading: false };
    case PRODUCT_LIST:
      return { ...state, products: payload };
    case SEND_OFFER:
      return { ...state, offered: true };
    default:
      return state;
  }
};

export default product;
