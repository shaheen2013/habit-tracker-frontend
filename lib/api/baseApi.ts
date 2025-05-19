import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");

      return headers;
    },
    credentials: "include",
  }),
  endpoints: () => ({}),
});

export default baseApi;
