import axios from "axios";
import {
  CATEGORY_LIST,
  COLOR_LIST,
  BRAND_LIST,
  STATUS_LIST,
  FETCH_START,
  FETCH_SUCCESS,
} from "./types";

export const getCategoryList = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_START });
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVICE_BASE_URL}detail/category/all`
    );
    dispatch({ type: CATEGORY_LIST, payload: data });
    dispatch({ type: FETCH_SUCCESS });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllList = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_START });
    const data = await axios.all([
      axios.get(`${process.env.REACT_APP_SERVICE_BASE_URL}detail/category/all`),
      axios.get(`${process.env.REACT_APP_SERVICE_BASE_URL}detail/brand/all`),
      axios.get(`${process.env.REACT_APP_SERVICE_BASE_URL}detail/color/all`),
      axios.get(`${process.env.REACT_APP_SERVICE_BASE_URL}detail/status/all`),
    ]);
    dispatch({ type: CATEGORY_LIST, payload: data[0].data });
    dispatch({ type: BRAND_LIST, payload: data[1].data });
    dispatch({ type: COLOR_LIST, payload: data[2].data });
    dispatch({ type: STATUS_LIST, payload: data[3].data });
    dispatch({ type: FETCH_SUCCESS });
  } catch (e) {
    console.log(e);
  }
};
