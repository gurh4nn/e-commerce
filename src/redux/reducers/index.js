import { combineReducers } from "redux";
import auth  from "./auth";
import product from './product';
import detail from './detail';
import account from './account';

const reducer = combineReducers({
    auth,
    detail,
    product,
    account,
})

export default reducer