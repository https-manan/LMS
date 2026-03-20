import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../authSlice';

const USER_API = 'http://localhost:8080/api/v1/users/';

export const authApi = createApi({       
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({       
        registerUser: builder.mutation({   
            query: (data) => ({
                url: 'register',
                method: "POST",
                body: data
            })
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: 'login',
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({
            query: (data)=>({
                url:'profile',
                method:"GET"
            })
        })
    })
});


export const { useLoginUserMutation, useRegisterUserMutation, useLoadUserQuery } = authApi;