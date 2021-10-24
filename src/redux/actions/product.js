import axios from "axios";
import { FETCH_START, FETCH_SUCCESS, PRODUCT_LIST, SEND_OFFER } from "./types";
import { toast } from "react-toastify";

export const getProductList = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_START });
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVICE_BASE_URL}product/all`
    );
    dispatch({ type: PRODUCT_LIST, payload: data });
    dispatch({ type: FETCH_SUCCESS });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getDetailItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_START });
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVICE_BASE_URL}product/${id}`
    );
    dispatch({ type: FETCH_SUCCESS });
    return data;
  } catch (e) {
    toast.error(e.response.data?.message);
  }
};

export const buyProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_START });
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVICE_BASE_URL}product/purchase/${id}`,
      "",
      config
    );
    dispatch({ type: FETCH_SUCCESS });
    return data;
  } catch (e) {
    toast.error(e.response.data?.message);
  }
};

export const sendOffer = (id, price) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_START });
    const token = localStorage.getItem("accessToken");
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVICE_BASE_URL}product/offer/${id}`,
      { offeredPrice: price },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: SEND_OFFER });
    toast.success("Teklif basariyla verildi");
    dispatch({ type: FETCH_SUCCESS });
    return data;
  } catch (e) {
    toast.error(e.response.data?.message);
  }
};

export const buyOfferedProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_START });
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVICE_BASE_URL}product/purchase/${id}`, '',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: SEND_OFFER });
      toast.success("Urun Basariyla Satin Alindi");
      dispatch({ type: FETCH_SUCCESS });
      return data;
    } catch (e) {
      toast.error(e.response.data?.message);
    }
  };
