import {
  CATEGORY_LIST,
  COLOR_LIST,
  BRAND_LIST,
  STATUS_LIST,
  FETCH_START,
  FETCH_SUCCESS,
} from "redux/actions/types";

const INITIAL_STATE = {
  loading: true,
  category: [],
  color: [],
  brand: [],
  status: [],
};

const detail = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_START:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, loading: false };
    case CATEGORY_LIST:
      return { ...state, category: payload };
    case COLOR_LIST:
      return { ...state, color: payload };
    case BRAND_LIST:
      return { ...state, brand: payload };
    case STATUS_LIST:
      return { ...state, status: payload };
    default:
      return state;
  }
};

export default detail;
