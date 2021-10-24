import {
    FETCH_START,
    FETCH_SUCCESS,
    RECEIVED_OFFERS,
    GIVEN_OFFERS
  } from "redux/actions/types";
  
  const INITIAL_STATE = {
    loading: true,
    givenOffers: [],
    receivedOffers: []
  };
  
  const detail = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
      case FETCH_START:
        return { ...state, loading: true };
      case FETCH_SUCCESS:
        return { ...state, loading: false };
      case RECEIVED_OFFERS:
        return { ...state, receivedOffers: payload };
      case GIVEN_OFFERS:
        return { ...state, givenOffers: payload };
      default:
        return state;
    }
  };
  
  export default detail;
  