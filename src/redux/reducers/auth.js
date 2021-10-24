import { USER_SIGNIN, USER_SIGNUP } from "redux/actions/types";

const initialState = {
  token: '',
  loading: true,
  user: ''
};

const auth = (state = initialState, action) => {
    const { type, payload } = action;
    switch ( type ) {
        case USER_SIGNIN:
            return { ...state, loading: false, user: payload };
        case USER_SIGNUP: 
            return { ...state, loading: false }
        default:
            return state;
    }
};

export default auth