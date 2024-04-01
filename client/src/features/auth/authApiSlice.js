
import apiSlice from '../../app/apiSlice';
import { setToken, logout } from './authSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (userData) => ({
        url: 'api/auth/login',
        method: 'POST',
        body: userData,
      }),
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       console.log("login:", data);
         
    //       if (data) {
    //         // Dispatch the setToken action with the received token
    //         dispatch(setToken({ accessToken: data })); // Pass the accessToken directly to setToken
    //         console.log("loginsetToken:", data);

    //       }
    //     } catch (err) {
    //       console.error('Error during login:', err);
    //     }
    //   },
    // }),

    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        console.log("login:", data);
       
        if (data?.accessToken) { // Check if accessToken exists in the response
          dispatch(setToken({ accessToken: data.accessToken })); // Pass accessToken to setToken
          console.log("loginsetToken:", data.accessToken);
        }
      } catch (err) {
        console.error('Error during login:', err);
      }
    },
  }),
  
    sendLogout: build.mutation({
      query: () => ({
        url: 'api/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Dispatch the logout action when logout is successful
          dispatch(logout());
          // Reset the API state after logout
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.error('Error during logout:', err);
        }
      },
    }),
    addUser:build.mutation({
      query: (userRegister) => ({
          url: "api/auth/registeration",
          method:"POST",
          body:userRegister
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            console.log("registeration:", data);
            // Check if the accessToken is available in the response
            if (data) {
              // Dispatch the setToken action with the received token
              dispatch(setToken({accessToken: data})); // Pass the accessToken directly to setToken
            }
          } catch (err) {
            console.error('Error during registeration:', err);
          }
        },
      invalidatesTags:["UserRegister"]
  }),

  refresh: build.mutation({
    query: () =>({
        url: "/api/auth/refresh",
        method: "GET"
    }),
    async onQueryStarted( arg,  { dispatch,   queryFulfilled }) {
        try {
            const { data } =  await queryFulfilled
            if(data.accessToken){
                dispatch(setToken({accessToken: data.accessToken}))
            }
        } catch (err) {
            console.log(err)
        }
    },

}),

})
})



export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation, useAddUserMutation } = authApiSlice;

