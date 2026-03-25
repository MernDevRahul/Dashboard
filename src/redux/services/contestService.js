import { apiSlice } from './apiSlice'

export const contestService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchContests: builder.query({
            query: ({page= 1, limit= 10, status, search }) => {
                const params = new URLSearchParams();
                params.append("page",page);
                params.append("limit",limit);
                status && params.append("status",status);
                search && params.append("search",search);
                return `contest/all?${params.toString()}`
            },
            providesTags: ["Contests"],
        }),
        addContest: builder.mutation({
            query: (data) => ({
                url: "contest/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Contests"],
        }),
        deleteContest: builder.mutation({
            query: (id) =>({
                url:`contest/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags:["Contests"]
        })
    })
})

export const { useFetchContestsQuery, useAddContestMutation, useDeleteContestMutation } = contestService;