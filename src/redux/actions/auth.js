import axios from "axios";
import {
  USER_SIGNIN,
  USER_SIGNUP,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  LOGIN_CHECK,
} from "./types";
import { toast } from "react-toastify";

//TODO: custom axios eklenecek

export const signin = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_START });
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVICE_BASE_URL}authorization/signin`,
        payload
      );
      dispatch({ type: USER_SIGNIN, payload: data.access_token });
      document.cookie = `accessToken=${data.access_token}`;
      localStorage.setItem("userMail", payload.email);
      toast.success("Giris basarili, yonlendiriliyorsunuz...", {
        autoClose: 3000,
      });
      return true;
    } catch (e) {
      toast.error(e.response.data?.message);
      dispatch({ type: FETCH_ERROR, payload: e });
    }
  };
};

export const signup = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_START });
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVICE_BASE_URL}authorization/signup`,
        payload
      );
      dispatch({ type: USER_SIGNUP, payload: data.access_token });
      document.cookie = `accessToken=${data.access_token}`;
      localStorage.setItem("userMail", payload.email);
      toast.success("Giris basarili, yonlendiriliyorsunuz...", {
        autoClose: 3000,
      });
      dispatch({ type: FETCH_SUCCESS });
    } catch (e) {
      toast.error(e.response.data?.message);
      dispatch({ type: FETCH_ERROR, payload: e });
    }
  };
};

export const checkAuth = () => async (dispatch) => {
  try {
    const getCookieValue = (name) =>
      document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() ||
      "";
    const tokenCheck = getCookieValue("accessToken");
    if (!!tokenCheck) {
      dispatch({ type: LOGIN_CHECK, payload: tokenCheck });
    } else {
      dispatch({ type: LOGIN_CHECK, payload: "" });
    }
  } catch (e) {
    dispatch({ type: FETCH_ERROR, payload: e });
  }
};
