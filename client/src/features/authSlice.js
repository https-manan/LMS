import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    isAuthenticated:false
}

const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{
        userLogginedIn:(state,action)=>{
            state.user = action.payload.user;
            state.isAuthenticated=true;
        },
        userLogginedOut:(state)=>{
            state.user = null;
            state.isAuthenticated=false
        }
    }
})

export const {userLogginedIn,userLogginedOut} = authSlice.actions;
export default authSlice.reducer;