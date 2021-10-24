import axios from "axios";
import { USER_SIGNIN, USER_SIGNUP, FETCH_START, FETCH_SUCCESS, FETCH_ERROR } from "./types";

//TODO: custom axios eklenecek

export const signin = (payload) => {
    return async dispatch => {
        try {
            // dispatch({type: FETCH_START});
            const { data } = await axios.post(`${process.env.REACT_APP_SERVICE_BASE_URL}authorization/signin`, payload);
            localStorage.setItem('accessToken', data.access_token)
            localStorage.setItem('userMail', payload.email)
            dispatch({type: USER_SIGNIN})
            return true
        } catch(e) {
            dispatch({type: FETCH_ERROR, payload: e});
        }
    }
}

export const signup = (payload) => {
   return async dispatch => {
    try {
        dispatch({type: FETCH_START});
        const { data } = await axios.post(`${process.env.REACT_APP_SERVICE_BASE_URL}authorization/signup`, payload);
        localStorage.setItem('accessToken', data.access_token)
        localStorage.setItem('userMail', payload.email)
        dispatch({type: FETCH_SUCCESS});
    } catch(e) {
        dispatch({type: FETCH_ERROR, payload: e})
    }
   }
}