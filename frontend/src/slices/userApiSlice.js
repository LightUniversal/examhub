import { IMAGEUPLOAD_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data
            })
        }),
        profileImage: builder.mutation({
            query: (data) => ({
                url: `${IMAGEUPLOAD_URL}/includeImage`,
                method: "POST",
                body: data
            })
        }),
        addRemoveFriend: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "PUT",
                body: data
            })
        }),
        getUser: builder.query({
            query: () => ({
                url: `${USERS_URL}/id`,
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
            })
        })
    })
});

export const {
    useLoginMutation, useLogoutMutation, useRegisterMutation, useGetUserQuery, useProfileImageMutation, useAddRemoveFriendMutation, useGetUsersQuery
} = userApiSlice;