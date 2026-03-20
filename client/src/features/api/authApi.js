import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../authSlice';

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
            async onQueryStarted(arg, { _, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logoutUser:builder.query({
            query:()=>({
                url:'logout',
                method:'GET'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(userLoggedOut);
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
        }),
        updateUser:builder.mutation({
            query:(formData)=>({
                url:'profile/update',
                method:'PUT',
                body:formData,
                credentials:"include"
            })
        })
    })
});


export const { useLoginUserMutation, useLogoutUserQuery ,useRegisterUserMutation, useLoadUserQuery,useUpdateUserMutation } = authApi;