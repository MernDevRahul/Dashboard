import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
    baseUrl:"http://localhost:8000/",
    credentials:"include"
})

// const baseQueryWithAuth = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     window.location.href = "/sign-in";
//   }

//   return result;
// };

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: baseQuery,
    tagTypes:["Owner"],
    endpoints: () => ({})
})