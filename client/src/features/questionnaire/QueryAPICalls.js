
import apiSlice from "../../app/apiSlice";

const QueryAPICalls = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuery: builder.query({
            query: () => ({
                url: 'api/Questionnaire'
            }),
            providesTags:['questionnaires']
        }),
        addQuery: builder.mutation({
            query: (questionnaire) => ({
                url: 'api/Questionnaire',
                method: 'POST',
                body: questionnaire  // Sending the questionnaire object directly
            }),
            invalidatesTags:['questionnaires']
        })
    }),
});

export const { useGetQueryQuery, useAddQueryMutation } = QueryAPICalls;

