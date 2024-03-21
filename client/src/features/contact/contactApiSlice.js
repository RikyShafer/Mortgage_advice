
import apiSlice from '../../app/apiSlice';
const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    contact: build.mutation({
      query: (userData) => ({
        url: 'api/contact',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ["Contact"]

    }),


  }),
});

export const {useContactMutation} = contactApiSlice;

