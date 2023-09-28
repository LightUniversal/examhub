import { apiSlice } from "./apiSlice";
import { COURSE_URL } from "../constants";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQST: builder.query({
      query: () => ({
        url: `${COURSE_URL}`,
      }),
    }),
  }),
});

export const {
    useGetAllQSTQuery
} = courseApiSlice;