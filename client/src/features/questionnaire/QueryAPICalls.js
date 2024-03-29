
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
            query: (formData) => ({
                url: 'api/Questionnaire',
                method: 'POST',
                body: formData // Sending formData object directly
            }),
            invalidatesTags: ['questionnaires']
        })
    }),
});

export const { useGetQueryQuery, useAddQueryMutation } = QueryAPICalls;

