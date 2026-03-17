import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { userLogginedIn } from '../authSlice';

const USER_API='http://localhost:8080/api/v1/users/'


export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:"include"
    }),
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(inputdata)=>({
                url:"register",
                method:"POST",
                body:inputdata
            })
        }),
        loginUser:builder.mutation({
            query:(inputdata)=>({
                url:"login",
                method:"POST",
                body:inputdata
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try {
                    dispatch(userLogginedIn({user:result.data.user}))
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
})

export const {useRegisterUserMutation,useLoginUserMutation} = authApi