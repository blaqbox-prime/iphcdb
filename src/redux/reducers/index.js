import { combineReducers } from "@reduxjs/toolkit";
import authUserReducer from './authUser/authUserSlice'

const rootReducer = combineReducers({
    authUser: authUserReducer
});

export default rootReducer;