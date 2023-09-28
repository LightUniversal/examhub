import { USERS_URL, POSTS_URL, IMAGEUPLOAD_URL, BASE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getAllPost: builder.query({
      query: () => ({
        url: `${POSTS_URL}`,
      }),
    }),
    getPostById:builder.query({
      query: (id) => ({
        url: `/profile/${id}`,
      }),
      keepUnusedDataFor : 5
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    createView: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),
    likeAPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    deleteComment: builder.mutation({
      query: (id, viewId) => ({
        url: `${POSTS_URL}/${id}/${viewId}`,
        method: "DELETE",
      }),
    }),
    addImage: builder.mutation({
      query: (data) => ({
        url: `${IMAGEUPLOAD_URL}/includeImage`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useUpdatePostMutation,
  useAddPostMutation,
  useAddImageMutation,
  useLikeAPostMutation,
  useDeletePostMutation,
  useCreateViewMutation,
  useDeleteCommentMutation,
  useGetPostByIdQuery
} = postApiSlice;
