


// import apiSlice from "./apiSlice";

// const DirectorAPICalls = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getUser: builder.query({
//             query: () => ({
//                 url: 'api/User/' // Corrected endpoint URL
//                 // method: 'GET',
//             }),
//             providesTags:['User']
//         }),
//         addUser: builder.mutation({
//             query: (body) => ({ // Renamed parameter to 'body'
//                 url: 'api/User/', // Corrected endpoint URL
//                 method: 'POST',
//                 body: body // Sending the questionnaire object directly
//             }),
//             invalidatesTags:['User']
//         })
//     }),
// });

// export const { useGetUserQuery, useAddUserMutation } = DirectorAPICalls;


// // DirectorAPICalls.js
// import apiSlice from "./apiSlice";

// const DirectorAPICalls = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getUser: builder.query({
//             query: () => ({
//                 url: 'api/User', // Corrected endpoint URL
//             }),
//             providesTags:['User']
//         }),
//         addUser: builder.mutation({
//             query: (body) => ({ 
//                 url: 'api/User', // Corrected endpoint URL
//                 method: 'POST',
//                 body: body 
//             }),
//             invalidatesTags:['User']
//         })
//     }),
// });

// export const { useGetUserQuery, useAddUserMutation } = DirectorAPICalls;



// DirectorAPICalls.js
import apiSlice from "../app/apiSlice";

const DirectorAPICalls = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: 'api/Usere/', // Corrected endpoint URL
            }),
            // providesTags:['User']
        }),
        addUser: builder.mutation({
            query: (body) => ({ 
                url: 'api/Usere/', // Corrected endpoint URL
                method: 'POST',
                body: body 
            }),
            // invalidatesTags:['User']
        })
    }),
});

export const { useGetUserQuery, useAddUserMutation } = DirectorAPICalls;