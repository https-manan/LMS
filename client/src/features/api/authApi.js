import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../authSlice';

const USER_API = 'http://localhost:8080/api/v1/';

export const authApi = createApi({
    reducerPath: "authApi",
    tagTypes:['Refetch_Creator_Course'],
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: 'users/register',
                method: "POST",
                body: data
            })
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: 'users/login',
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
        logoutUser: builder.mutation({
            query: () => ({
                url: 'users/logout',
                method: 'GET'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(userLoggedOut());
                     console.log("loadUser result:", result.data); 
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url: 'users/profile',
                method: "GET"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: 'users/profile/update',
                method: 'PUT',
                body: formData,
                credentials: "include"
            })
        }),
        createCourse:builder.mutation({
            query:(formData)=>({
                url:"/courses/create",
                method:"POST",
                body:formData,
                credentials:"include"
            }),
            invalidatesTags:['Refetch_Creator_Course']
        }),
        getCourse: builder.query({
            query: () => ({
                url: "/courses/getCourse",
                method: "GET",
            }),
            providesTags: ['Refetch_Creator_Course'] // invalidatesTags is for mutations, not queries
        }),
        editCourse:builder.mutation({
            query:({formData,courseId})=>({
                url:`/courses/editCourse/${courseId}`,
                method:"PUT",
                body:formData
            }),
            invalidatesTags:['Refetch_Creator_Course']
        }),
        getCourseById:builder.query({
            query:(courseId)=>({
                url:`/courses/getCourse/${courseId}`,
                method:"GET"
            })
        }),
        createLecture:builder.mutation({
            query:(formData,courseId)=>({
                url:`/courses/${courseId}/lecture`,
                method:"POST",
                body:formData,
                credentials:"include"
            })
        }),
        getLecture:builder.query({
            query:(courseId)=>({
                url:`/course/${courseId}/lecture`,
                method:"GET"
            })
        }),
        editLecture:builder.mutation({
            query:(courseId,formData)=>({
                url:`/courses/${courseId}/${lectureId}/update-lecture`,
                method:"PUT",
                body:formData,
                credentials:"include"
            })
        })
    })
});


export const { useLoginUserMutation, useLogoutUserMutation, useRegisterUserMutation, useLoadUserQuery, useUpdateUserMutation,useCreateCourseMutation,useGetCourseQuery,useEditCourseMutation,useGetCourseByIdQuery,useCreateLectureMutation,useGetLectureQuery,useEditLectureMutation} = authApi;