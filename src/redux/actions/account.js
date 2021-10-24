import axios from "axios";
import { FETCH_START, FETCH_SUCCESS, GIVEN_OFFERS, RECEIVED_OFFERS } from "./types";
import { toast } from "react-toastify";

export const givenOffers = () => async dispatch => {
    try {
        dispatch({type: FETCH_START});
        const token = localStorage.getItem('accessToken')
        const config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        const { data } = await axios.get(`${process.env.REACT_APP_SERVICE_BASE_URL}account/given-offers`, config);
        dispatch({type: GIVEN_OFFERS, payload: data})
        dispatch({type: FETCH_SUCCESS})
    } catch (e) {
        toast.error(e.response.data?.message);
    }
}

export const receivedOffers = () => async dispatch => {
    try {
        dispatch({type: FETCH_START});
        const token = localStorage.getItem('accessToken')
        const config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        const { data } = await axios.get(`${process.env.REACT_APP_SERVICE_BASE_URL}account/received-offers`, config);
        dispatch({type: RECEIVED_OFFERS, payload: data})
        dispatch({type: FETCH_SUCCESS})
        return data
    } catch (e) {
        toast.error(e.response.data?.message);
    }
}

export const rejectOffer = (id) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_START });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVICE_BASE_URL}account/reject-offer/${id}`,
        "",
        config
      );
      dispatch({ type: FETCH_SUCCESS });
      return data;
    } catch (e) {
      toast.error(e.response.data?.message);
    }
  };

  export const acceptOffer = (id) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_START });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVICE_BASE_URL}account/accept-offer/${id}`,
        "",
        config
      );
      dispatch({ type: FETCH_SUCCESS });
      return data;
    } catch (e) {
      toast.error(e.response.data?.message);
    }
  };