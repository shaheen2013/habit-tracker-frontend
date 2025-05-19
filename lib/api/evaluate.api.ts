import baseApi from "./baseApi";

const evaluateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    evaluateOath: builder.mutation({
      query: (payload) => ({
        url: `evaluate`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useEvaluateOathMutation } = evaluateApi;

export default evaluateApi;
