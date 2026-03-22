import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import {authApi} from "@/features/api/authApi"

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer  //Ye jo yha naam hota hai this is what we gonna use in useSelector like hrere auth so useSelector((state)=>{state.auth.user})
})

export default rootReducer;