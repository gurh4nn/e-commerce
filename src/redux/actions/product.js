import axios from "axios";
import { FETCH_START, FETCH_SUCCESS, PRODUCT_LIST, SEND_OFFER } from "./types";
import { toast } from "react-toastify";

const getCookieValue = (name) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

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
    const token = getCookieValue("accessToken");
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
    const token = getCookieValue("accessToken");
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

export const addProduct = (payload) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_START });
    const token = getCookieValue("accessToken");
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVICE_BASE_URL}product/create`, payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Ürün Başarıyla Eklendi, anasayfaya yönlendiriliyorsunuz...", {autoClose: 3000});
    dispatch({ type: FETCH_SUCCESS });
    return true;
  } catch (e) {
    toast.error(e.response.data?.message);
  }
};

export const imageUpload = (payload) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_START });
    const token = getCookieValue("accessToken");
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVICE_BASE_URL}file/upload/image`, payload,
      {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Görsel Başarıyla Yüklend");
    dispatch({ type: FETCH_SUCCESS });
    return data;
  } catch (e) {
    toast.error(e.response.data?.message);
  }
};

export const buyOfferedProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_START });
      const token = getCookieValue("accessToken");
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
