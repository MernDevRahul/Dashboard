import { apiSlice } from "./apiSlice";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "auth/send-otp",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags:["Owner"]
    }),

    fetchOwner: builder.query({
      query: () => "auth/fetch-owner",
      providesTags: ["Owner"],
    }),

    updateLoggedInUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/update-user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Owner"],
    }),
  }),
});

export const { useSendOtpMutation ,useVerifyOtpMutation ,useLoginMutation, useLogoutMutation, useFetchOwnerQuery, useLazyFetchOwnerQuery, useUpdateLoggedInUserMutation } = authService;